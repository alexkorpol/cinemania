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
/////My section weekly//////////////////////////////////////////
const homeCards = document.querySelector('.home__cards');
const modal = document.querySelector('.modal');
modal.classList.add('is-hidden');
const modalOverlay = document.querySelector('.modal__overlay');
const modalPoster = document.querySelector('.modal__poster');
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
        const markUp = `<div class="card" data-id=${id}>
          <div class="card__thumb">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" data-id=${id} class="card__image" alt=${original_title}>
          </div>
          <div class="card__info">
            <strong class="card__title">${title}</strong>
            <div class="card__description"><span class="card__genre">${genre_ids} </span><span class="card__sign"> | </span><span class="card__release"> ${chopped}</span>
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
async function getDetailFilm(movie_id) {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}?api_key=${KEY}&language=en-US`
  );
  return response.data;
}
async function renderModal(movie) {
  const {
    id,
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
    <div class="modal__thumb">
      <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt=${original_title} class="modal__img">
    </div>
    <div class="modal__info">
      <h2 class="modal__title">${original_title}</h2>
      <ul class="modal__list">
      <li class="modal__list-item"><p class="modal__list-vote">Vote / Votes</p><span class="modal__list-values"><span class="modal__list-evalue">${vote_average}</span><span class="modal__list-sign"> / </span><span class="modal__list-evalue">${vote_count}</span></span></li>
      <li class="modal__list-item"><p class="modal__list-popularity">Popularity</p><span class="modal__list-count">${popularity}</span></li>
      <li class="modal__list-item"><p class="modal__list-genre">Genre</p><span class="modal__list-genres">${genresList}</span></li>
      </ul>
      <strong class="modal__about">About</strong>
      <p class="modal__description">${overview}</p>
      <button type="button" class="button-send">Add to my library</button>
    </div>`;
  modalPoster.insertAdjacentHTML('beforeend', modalMarkup);
  setTimeout(() => {
    const filmInfo = {
      id,
      poster_path,
      original_title,
      vote_average,
      vote_count,
      popularity,
      genres,
      overview,
    };
    const sendButton = document.querySelector('.button-send');
    const dataFilm = JSON.stringify(filmInfo);
    const collectionOfFilms = [];
    sendButton.addEventListener('click', () => {
      modal.classList.add('is-hidden');
      modalPoster.innerHTML = '';
    });
  }, 0);
}
function modalClose(evt) {
  modal.classList.add('is-hidden');
  modalPoster.innerHTML = '';
}
function modalOpen(evt) {
  modal.classList.remove('is-hidden');
  const id = evt.target.dataset.id;
  renderModal(getDetailFilm(id));
}
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode == 27) {
    modal.classList.add('is-hidden');
    modalPoster.innerHTML = '';
  }
});
setTimeout(() => {
  const closeButton = document.querySelector('.close');
  homeCards.addEventListener('click', modalOpen);
  closeButton.addEventListener('click', modalClose);
}, 0);
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
async function getRandomMovie() {
  const apiKey = '0d9ddfeb4636025259fcaee6725b8ad3';
  const maxPages = 1; // maximum number of pages with movies in API
  const randomPage = Math.floor(Math.random() * maxPages) + 1;
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${randomPage}`;
  const response = await axios.get(url);
  const randomMovie =
    response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ];
  return randomMovie;
}

async function displayRandomMovie() {
  const movie = await getRandomMovie();
  const movieCard = `
    <div class="container movie-card">
    <h2 class="movie-card-title">upcoming this mounth</h2>
<div class="mo">
      <div class="movie-card__image">
      <img src="https://image.tmdb.org/t/p/original/${
        movie.backdrop_path
      }" class="card__picture" alt="${movie.title}">
      </div>
      <div class="movie-card__content">
      <h2 class="movie-title">${movie.title}</h2>
      <div class="movie-card__mo">
      <div>
      <p class="movie-date">Release date: <span> ${
        movie.release_date
      } </span></p>
      <p class="movie-vote">Vote/Votes: <span class="movie-vote__span">${
        movie.vote_average
      }</span>/<span>${movie.vote_count} </span></p>
      </div>
      <div>
      <p class="movie-popularity">Popularity:<span> ${
        movie.popularity
      } </span></p>
      <p class="movie-genre">Genre:<span> ${movie.genre_ids.join(
        ', '
      )} </span></p>
      </div>
      </div>
      <p class="movie-about"> ABOUT </p>
      <span class="movie-about__descr"> ${movie.overview}</span>
      <button type="button" class="button-remind">Remind me</button>
      </div>
    </div>
    </div>
  `;
  const section = document.querySelector('.movie-container');
  section.innerHTML = movieCard;
}

async function callMovieCard() {
  const response = getRandomMovie();
  displayRandomMovie((await response).data);
}

callMovieCard();
