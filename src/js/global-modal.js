import { IMG_BASE_URL, IMG_W400 } from './api-key';
import { getSecondMovieById } from './api';
import {
  addMovieToLibrary,
  removeMovieFromLibrary,
  getMovieFromLibrary,
  renderLibraryData,
} from './library';

const refs = {
  backdrop: document.querySelector('.backdrop'),
  openModal: document.querySelector('.films'),
  cardList: document.querySelector('.films'),
  libraryList: document.querySelector('.library-list'),
  modalCont: document.querySelector('.modal__container'),
  FilmBtn: document.querySelector('.film__button'),
  closeModal: document.querySelector('.modal__close-btn'),
  cardsfilm: document.querySelector('.cards-film'),
};

let posterPath = '';
let genresList = [];
let filmMarkup = '';
let filmBtn;
let selectedMovieId;

if (refs.cardList) {
  refs.cardList.addEventListener('click', createModal);
}

function createModal(event) {
  const selectedMovie = event.target.closest('li');
  selectedMovieId = Number(selectedMovie.getAttribute('data-id'));
  refs.closeModal.addEventListener('click', closeModalDescr);

  createMarkup(selectedMovieId);

  openModal();
}

//modal
function openModal(e) {
  refs.backdrop.classList.remove('is-hidden');
  refs.modalCont.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);
}

function AddFilmToLibrary() {
  const filmsSecId = filmBtn.dataset.id;
  if (getMovieFromLibrary(selectedMovieId)) {
    removeMovieFromLibrary(selectedMovieId);
    filmBtn.innerHTML = 'Add to Library';
  } else {
    addMovieToLibrary(selectedMovieId);
    filmBtn.innerHTML = 'Remove from Library';
  }
}

// Verefy LS
function changeBtnLibrary(filmsId, filmBtn) {
  if (getMovieFromLibrary(filmsId)) {
    filmBtn.innerHTML = 'Remove from Library';
  } else {
    filmBtn.innerHTML = 'Add to Library';
  }
}

// Add markup  movie
async function createMarkup(filmID) {
  const film = getSecondMovieById(filmID);
  genresList = [];
  refs.cardsfilm.innerHTML = '';
  film.then(data => {
    const genres = data.genres;

    genres.forEach(genre => {
      genresList.push(` ${genre.name}`);
    });
    filmMarkup = createFilmMarkup(data);
    refs.cardsfilm.innerHTML = filmMarkup;
    // save the link to the button
    filmBtn = document.querySelector('.film__button');
    filmBtn.addEventListener('click', AddFilmToLibrary);
    changeBtnLibrary(selectedMovieId, filmBtn);
  });
}

//  ESC modal
function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    closeModalDescr();
  }
}

// moda back
function onBackdropClick(e) {
  if (e.target === refs.backdrop) {
    closeModalDescr();
  }
}

// close modal
function closeModalDescr(e) {
  refs.backdrop.classList.add('is-hidden');
  refs.modalCont.classList.add('is-hidden');
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);
  document.removeEventListener('click', AddFilmToLibrary);
  if (refs.libraryList) {
    renderLibraryData();
    refs.cardList = document.querySelector('.films');
    if (refs.cardList) refs.cardList.addEventListener('click', createModal);
  }
}

// render mark
function createFilmMarkup(data) {
  if (data) {
    const {
      original_title,
      id,
      vote_average,
      poster_path,
      overview,
      popularity,
      vote_count,
    } = data;

    if (poster_path) {
      posterPath = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
    }

    return `<div class='film-wrap' data-id='${id}'>
          <ul class='film-list'>
          <li class='film-list__img'>
            <img
              src='${posterPath}'
              alt='${original_title}'
              loading='lazy'
            />
            </li>
            <li class='film-list__info'>            
                <h2 class='film-list__title'>${original_title}</h2>
                <div class="film-list__wood">
                  <div class="film-list__sub--title">
                    <p>Vote / Votes</p>
                    <p>Popularity</p>
                    <p class='film-list__sub--title'>Genre</p>
                  </div>
                  <div  class="film-list__title--wood">
                    <p class='film-list__text--average'><span  class='film-list__average'>${vote_average}</span>  /  <span  class='film-list__average'>${vote_count}</span></p>
                    <p class='film-list__last--text'>${popularity}</p>
                    <p class='film-list__last--text'>${genresList}</p>
                  </div>
                </div>
                <div class='film-list__about'>
                <p class='film-list__title--about'>ABOUT</p>
                <p class='film-list__text--about'>${overview}</p>
                 </div>
                 <div class="film__button-position">
                 <button type="button" class="film__button">Add to my library</button>
             </div>
            </li>
          </ul>
      </div>`;
  }
}
