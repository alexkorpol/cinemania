import axios from 'axios';
import { KEY } from './api-key';
// // const BASE_URL = 'https://api.themoviedb.org/3/';
// // const PATH = '/trending/movie/week?';
// // const API_KEY = 'api_key=0d9ddfeb4636025259fcaee6725b8ad3';
// const movieCard = document.createElement('div');
// movieCard.classList.add('home__card');
// section.append(movieCard);
// async function getRandomMovie() {
//   const apiKey = '0d9ddfeb4636025259fcaee6725b8ad3';
//   const maxPages = 1; // maximum number of pages with movies in API
//   const randomPage = Math.floor(Math.random() * maxPages) + 1;
//   const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${randomPage}`;
//   const response = await axios.get(url);
//   const randomMovie =
//     response.data.results[
//       Math.floor(Math.random() * response.data.results.length)
//     ];
//   return randomMovie;
// }

// async function displayRandomMovie() {
//   const movie = await getRandomMovie();
//   const movieCard = `
//     <div class="container movie-card">
//     <h2 class="movie-card-title">upcoming this mounth</h2>
// <div class="mo">
//       <div class="movie-card__image">
//       <img src="https://image.tmdb.org/t/p/original/${
//         movie.backdrop_path
//       }" class="card__picture" alt="${movie.title}">
//       </div>
//       <div class="movie-card__content">
//       <h2 class="movie-title">${movie.title}</h2>
//       <div class="movie-card__mo">
//       <div>
//       <p class="movie-date">Release date: <span> ${
//         movie.release_date
//       } </span></p>
//       <p class="movie-vote">Vote/Votes: <span class="movie-vote__span">${
//         movie.vote_average
//       }</span>/<span>${movie.vote_count} </span></p>
//       </div>
//       <div>
//       <p class="movie-popularity">Popularity:<span> ${
//         movie.popularity
//       } </span></p>
//       <p class="movie-genre">Genre:<span> ${movie.genre_ids.join(
//         ', '
//       )} </span></p>
//       </div>
//       </div>
//       <p class="movie-about"> ABOUT </p>
//       <span class="movie-about__descr"> ${movie.overview}</span>
//       <button type="button" class="button-remind">Remind me</button>
//       </div>
//     </div>
//     </div>
//   `;
//   const section = document.querySelector('.home');
//   section.innerHTML = movieCard;
// }

// async function callMovieCard() {
//   const response = getRandomMovie();
//   displayRandomMovie((await response).data);
// }

// callMovieCard();
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
        const markUp = `<div class="card" data-id=${id}>
          <div class="card__thumb">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" data-id=${id} class="card__image" alt=${original_title}>
          </div>
          <div class="card__info">
            <strong class="card__title">${title}</strong>
            <div class="card__description"><span class="card__genre">${genre_ids} </span><span class="card__sign"> | </span><span class="card__release"> ${chopped}</span>
            <form class="form">
              <label class="form__label" for="form__label">
              <input type="range" value=${vote_average} id="form__label" min="0" max="10" class="form__range">
              </label>
            </form>
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
}
setTimeout(() => {
  const closeButton = document.querySelector('.close');
  homeCards.addEventListener('click', evt => {
    modal.classList.remove('is-hidden');
    const id = evt.target.dataset.id;
    renderModal(getDetailFilm(id));
  });
  closeButton.addEventListener('click', () => {
    modal.classList.add('is-hidden');
    modalPoster.innerHTML = '';
  });
}, 0);
