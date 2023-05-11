import axios from 'axios';
import { KEY } from './api-key';
import { renderModal, addToLibrary } from './global-modal';
import { BASE_URL } from './api-key';
import { openModal } from './render_footer_modal';
const emptyStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

const fullStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="rgba(248, 65, 25, 1)" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

const halfStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>
<path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>
<defs>
<linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
<linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;
// ВІДМАЛЬОВУЄ
const url = `${BASE_URL}/movie/{movie_id}?api_key=${KEY}&language=en-US&page=9`;
const libraryButton = document.querySelector('.libr-btn');
const libraryContainer = document.querySelector('.my-library__list');
function renderMovieInLibrary(movie) {
  const {
    original_title,
    poster_path,
    id,
    vote_average,
    genres,
    release_date,
  } = movie;
  const librContent = document.querySelector('.libr-content');
  let ratingStars = '';
  const rating = Math.round(vote_average);
  switch (rating) {
    case 0:
      ratingStars = `${emptyStar.repeat(5)}`;
      break;
    case 1:
      ratingStars = `${halfStar}${emptyStar.repeat(4)}`;
      break;
    case 2:
      ratingStars = `${fullStar}${emptyStar.repeat(4)}`;
      break;
    case 3:
      ratingStars = `${fullStar}${halfStar}${emptyStar.repeat(3)}`;
      break;
    case 4:
      ratingStars = `${fullStar.repeat(2)}${emptyStar.repeat(3)}`;
      break;
    case 5:
      ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(2)}`;
      break;
    case 6:
      ratingStars = `${fullStar.repeat(3)}${emptyStar.repeat(2)}`;
      break;
    case 7:
      ratingStars = `${fullStar.repeat(3)}${halfStar}${emptyStar}`;
      break;
    case 8:
      ratingStars = `${fullStar.repeat(4)}${emptyStar}`;
      break;
    case 9:
      ratingStars = `${fullStar.repeat(4)}${halfStar}`;
      break;
    case 10:
      ratingStars = `${fullStar.repeat(5)}`;
      break;
    default:
      throw new Error('Invalid rating');
  }
  console.log(library.length);
  if (!library.length) {
    const markUp = `  <div class="libr-content__container">
    <p class="libr-content__text">
      OOPS... <br>
      We are very sorry! <br>
      You don’t have any movies at your library.
    </p>
  </div>
  <a class="libr-btn" href="./catalog.html">Search movie</a>`;
    librContent.innerHTML = markUp;
    return;
  }
  const genresName = genres
    .map(genre => genre.name)
    .slice(0, 2)
    .join(', ');
  const dateChopped = release_date.slice(0, 4);
  const movieMarkup = `
    <li class="my-library__item">
        <div class="my-library__thumb">
          <img class="my-library__img" data-id=${id} src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${original_title}">
        </div>
        <div class="my-library__info">
          <strong class="my-library__title">${original_title}</strong>
          <span class="my-library__genres">${genresName}</span>
          <span class="my-library__sign"> | </span>
          <span class="my-library__release">${dateChopped}</span>
          <div class="my-library__rating">${ratingStars}</div>
        </div>
    </li>`;
  librContent.innerHTML = '';
  libraryContainer.insertAdjacentHTML('beforeend', movieMarkup);
}
// Отримати масив фільмів з локального сховища
const library = JSON.parse(localStorage.getItem('movieLibrary')) || [];
// Пройтись по кожному фільму в бібліотеці та відмалювати його
library.forEach(movie => {
  console.log(movie);
  renderMovieInLibrary(movie);
});
async function getModalByClick(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}?api_key=${KEY}&language=en-US`;
  const response = await axios.get(url);
  renderModal(response.data);
}
libraryContainer.addEventListener('click', evt => {
  const id = evt.target.dataset.id;
  const modal = document.querySelector('.modal-weekly');
  const modalPoster = document.querySelector('.modal-weekly__poster');
  modal.classList.remove('is-hidden');
  setTimeout(() => {
    const addButton = document.querySelector('.button-send');
    console.log(addButton);
    addButton.textContent = 'Remove from my library';
  }, 150);
  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => {
    modal.classList.add('is-hidden');
    modalPoster.innerHTML = '';
  });
  getModalByClick(id);
});
