import { createListMarkup } from './render';
import { getSecondMovieById } from './api';

const librariesKey = 'libraries';
let page = 1;
let perPage = 9;

const refs = {
  libraryList: document.querySelector('.library-list'),
  loadMoreButton: document.getElementById('loadMore'),
};

if (refs.libraryList) renderLibraryData();
if (refs.loadMoreButton) {
  refs.loadMoreButton.addEventListener('click', () => {
    page += 1;
    renderLibraryData();
  });
}

export function addMovieToLibrary(movieId) {
  getSecondMovieById(movieId).then(movie => {
    movie.genre_names = movie.genres
      .map(genre => {
        return genre.name;
      })
      .slice(0, 2)
      .join(',');
    if (movie.release_date) {
      movie.release_date = movie.release_date.slice(0, 4);
    }
    let libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
    libraries[movie.id] = movie;
    localStorage.setItem(librariesKey, JSON.stringify(libraries));
  });
}

export function removeMovieFromLibrary(movieId) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  delete libraries[movieId];
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
 if (refs.libraryList) renderLibraryData();

}

export function getMovieFromLibrary(movieId) {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return libraries[movieId];
}

function getMoviesFromLibrary() {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return Object.values(libraries);
}

export function renderLibraryData() {
  let movieMarkup = renderMovies();
  if (!movieMarkup) {
    movieMarkup = `
    <div class=" container">
      <p class="library-text__oops">OOPS... <br> We are very sorry! <br> You don't have any movies at your library.</p>
      <button class="btn-library" onclick="window.location.href='catalog.html'"><a class="btn-library__link">Search movie</a></button>
    </div>
      `;
  } else {
    movieMarkup = `<ul class="cards__list films">${movieMarkup}</ul>`;
  }
  refs.libraryList.innerHTML = movieMarkup;
}

function renderMovies() {
  const allMovies = getMoviesFromLibrary();

  if (!Object.keys(allMovies)) {
    return null;
  }

  let movies = allMovies.slice(0, page * perPage);

  const markup = createListMarkup(movies);

  refs.loadMoreButton.style = 'display: none;';
  if (allMovies.length > page * perPage) {
    refs.loadMoreButton.style = '';
  }
  return markup;
}