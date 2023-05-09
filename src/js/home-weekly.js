import axios from 'axios';
import { KEY } from './api-key';
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
const homeCards = document.querySelector('.home-weekly__cards');
const modal = document.querySelector('.modal-weekly');
modal.classList.add('is-hidden');
const modalOverlay = document.querySelector('.modal-weekly__overlay');
const modalPoster = document.querySelector('.modal-weekly__poster');
const closeButton = document.querySelector('.close');
const BASE_URL = 'https://api.themoviedb.org/3/';
async function getMovies() {
  const PATH = '/trending/movie/week?';
  // const API_KEY = 'api_key=0d9ddfeb4636025259fcaee6725b8ad3';
  const totalPages = 1000;
  const randomPage = Math.floor(Math.random() * (totalPages - 1) + 1);
  const response = await axios.get(
    `${BASE_URL}${PATH}api_key=${KEY}&page=${randomPage}`
  );
  let movies = response.data.results;
  const minLength = Math.floor(Math.random() * (17 - 1) + 1);
  const maxLength = minLength + 3;
  const results = movies.slice(minLength, maxLength);
  return results;
}
async function getGenres() {
  const response = await axios.get(
    `${BASE_URL}genre/movie/list?api_key=${KEY}&language=en-US`
  );
  return response.data.genres;
}
async function renderMovieCard(cards) {
  const responseGenres = getGenres();
  const genreName = await responseGenres;
  let movieArray = cards
    .map(
      ({
        original_title,
        genre_ids,
        release_date,
        poster_path,
        vote_average,
        title,
        id,
      }) => {
        const genres = genreName
          .filter(genre => {
            if (genre_ids.indexOf(genre.id) !== -1) {
              return genre;
            }
          })
          .map(genre => genre.name);
        const sliced = genres.slice(0, 2);
        genre_ids = sliced;
        const chopped = release_date.slice(0, 4);
        let ratingStars = '';

        if (!vote_average) {
          ratingStars = `${emptyStar.repeat(5)}`;
          return `<div>${ratingStars}</div>`;
        }

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
            ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(
              2
            )}`;
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
        const markUp = `<div class="card-weekly" data-id=${id}>
          <div class="card-weekly__thumb">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" data-id=${id} class="card-weekly__image" alt=${original_title}>
          </div>
          <div class="card-weekly__info">
            <strong class="card-weekly__title">${title}</strong>
            <div class="card-weekly__description"><span class="card-weekly__genre">${genre_ids} </span><span class="card-weekly__sign"> | </span><span class="card-weekly__release"> ${chopped}</span>
            <div class="rating-star">${ratingStars}</div>
            </div>
            
          </div>
          </div>      
        </div>`;

        return markUp;
      }
    )
    .join('');
  homeCards.insertAdjacentHTML('beforeend', movieArray);
}
async function callCards() {
  const response = getMovies();
  renderMovieCard(await response);
}
callCards();
/////////////////////////////
async function getDetailFilm(movie_id) {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}?api_key=${KEY}&language=en-US`
  );
  return response.data;
}
async function renderModal(movie) {
  const {
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  } = await movie;
  const genreName = genres.map(genre => genre.name);
  const genresList = genreName.slice(0, 2);
  const modalMarkup = `
    <div class="modal-weekly__thumb">
      <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt=${original_title} class="modal-weekly__img">
    </div>
    <div class="modal-weekly__info">
      <h2 class="modal-weekly__title">${original_title}</h2>
      <ul class="modal-weekly__list">
      <li class="modal-weekly__list-item"><p class="modal-weekly__list-vote">Vote / Votes</p><span class="modal-weekly__list-values"><span class="modal-weekly__list-evalue">${vote_average}</span><span class="modal-weekly__list-sign"> / </span><span class="modal-weekly__list-evalue">${vote_count}</span></span></li>
      <li class="modal-weekly__list-item"><p class="modal-weekly__list-popularity">Popularity</p><span class="modal-weekly__list-count">${popularity}</span></li>
      <li class="modal-weekly__list-item"><p class="modal-weekly__list-genre">Genre</p><span class="modal-weekly__list-genres">${genresList}</span></li>
      </ul>
      <strong class="modal-weekly__about">About</strong>
      <p class="modal-weekly__description">${overview}</p>
      <button type="button" class="button-send">Add to my library</button>
    </div>`;
  modalPoster.insertAdjacentHTML('beforeend', modalMarkup);

  setTimeout(() => {
    const closeButton = document.querySelector('.close');
    const addButton = document.querySelector('.button-send');
    addButton.addEventListener('click', () => {
      addToLibrary(movie);
    });

    closeButton.addEventListener('click', () => {
      modal.classList.add('is-hidden');
      modalPoster.innerHTML = '';
    });
  }, 0);
}
homeCards.addEventListener('click', async evt => {
  modal.classList.remove('is-hidden');
  const id = evt.target.dataset.id;
  const movie = await getDetailFilm(id);
  renderModal(movie);
});
function addToLibrary(movie) {
  // Отримати масив фільмів з локального сховища
  const library = JSON.parse(localStorage.getItem('movieLibrary')) || [];

  // Перевірити, чи фільм вже присутній в бібліотеці
  const existingMovie = library.find(item => item.id === movie.id);
  if (existingMovie) {
    console.log('Фільм вже присутній в бібліотеці');
    return;
  }

  // Додати фільм до масиву
  library.push(movie);

  // Зберегти оновлений масив у локальне сховище
  localStorage.setItem('movieLibrary', JSON.stringify(library));

  console.log('Фільм додано до бібліотеки');
}
closeButton.addEventListener('click', () => {
  modal.classList.add('is-hidden');
  modalPoster.innerHTML = '';
});

// ВІДМАЛЬОВУЄ
const libraryContainer = document.querySelector('.my-library__gallery');
function renderMovieInLibrary(movie) {
  const libraryContainer = document.querySelector('.my-library__gallery');

  const movieMarkup = `
  <div class="movie">
          <img src="${movie.poster_path}" alt="${movie.original_title}">
          <h2>${movie.original_title}</h2>
          <p>Vote Average: ${movie.vote_average}</p>
          <p>Vote Count: ${movie.vote_count}</p>
          <p>Popularity: ${movie.popularity}</p>
          <p>Genres: ${movie.genres}</p>
          <p>${movie.overview}</p>
        </div>`;

  libraryContainer.insertAdjacentHTML('beforeend', movieMarkup);
}

// Отримати масив фільмів з локального сховища
const library = JSON.parse(localStorage.getItem('movieLibrary')) || [];
console.log(library);
// Пройтись по кожному фільму в бібліотеці та відмалювати його
library.forEach(movie => {
  renderMovieInLibrary(movie);
});
//
