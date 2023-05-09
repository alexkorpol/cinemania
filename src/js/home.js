import axios from 'axios';
import { KEY } from './api-key';
import { renderModal } from './modal_film';
/////My section weekly//////////////////////////////////////////
const cards = document.querySelector('.cards');
const modal = document.querySelector('.modal');

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
  cards.insertAdjacentHTML('beforeend', movieArray);
}
async function callCards() {
  const response = getMovies();
  renderMovieCard(await response);
}
callCards();


renderModal();



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


async function getGenres() {
  const apiKey = '0d9ddfeb4636025259fcaee6725b8ad3';
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data.genres;
}


async function displayRandomMovie() {
  const movie = await getRandomMovie();
const genres = await getGenres();
  const genreNames = movie.genre_ids.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : '';
  }).join(', ');
  
  const movieCard = `
    <div class="container movie-card ">
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
      <p class="movie-genre">Genre:<span> ${genreNames} </span></p>
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

