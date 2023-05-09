import axios from 'axios';
import { KEY } from './api-key';
import { renderModal } from './modal_film';
//upcoming

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
  const genreNames = movie.genre_ids
    .map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : '';
    })
    .join(', ');

  const movieCard = `
    <div class="container movie-card ">
    <h2 class="movie-card-title">upcoming this mounth</h2>
<div class="mo">
      <div class="movie-card__image">
      <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" class="card__picture" alt="${movie.title}">
      </div>
      <div class="movie-card__content">
      <h2 class="movie-title">${movie.title}</h2>
      <div class="movie-card__mo">
      <div>
      <p class="movie-date">Release date: <span> ${movie.release_date} </span></p>
      <p class="movie-vote">Vote/Votes: <span class="movie-vote__span">${movie.vote_average}</span>/<span>${movie.vote_count} </span></p>
      </div>
      <div>
      <p class="movie-popularity">Popularity:<span> ${movie.popularity} </span></p>
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
