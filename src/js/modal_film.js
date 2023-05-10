
import axios from 'axios';
import { KEY } from './api-key';
const BASE_URL = 'https://api.themoviedb.org/3';
const modalPoster = document.querySelector('.modal__poster');
const films = document.querySelector('.films');
const modal = document.querySelector('.modal-weekly_overlay');

async function getDetailFilm(movie_id) {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}?api_key=${KEY}&language=en-US`
  );
  return response.data;
}

export async function renderModal(movie) {
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
  
  films.addEventListener('click', evt => {
    modal.classList.remove('is-hidden');
    const id = evt.target.dataset.id;
    renderModal(getDetailFilm(id));
  });

  closeButton.addEventListener('click', () => {
    modal.classList.add('is-hidden');
    modalPoster.innerHTML = '';
  });
}, 0);
