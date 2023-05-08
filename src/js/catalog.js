// import axios from 'axios';
//   import { KEY } from "./api-key";

//   const BASE_URL = 'https://api.themoviedb.org/3/';
//   const searchInput = document.getElementById('searchInput');
//   const movieList = document.querySelector('#movie-list');
//   const pagination = document.querySelector('.pagination')

//   async function fetchTrendingMovies() {
//   try {
//     const response = await axios.get(`${BASE_URL}trending/movie/week?api_key=${KEY}`);
//     const movies = response.data.results;
//     for (const movie of movies) {
//       try {
//         const { data: movieDetails } = await axios.get(
//           `${BASE_URL}movie/${movie.id}?api_key=${KEY}`
//         );
//         const movieHtml = movieTemplate({ ...movie, ...movieDetails });
//         movieList.insertAdjacentHTML('beforeend', movieHtml);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function searchMovies(event, currentPage = 1) {
//   event.preventDefault();
//   const searchTerm = searchInput.value;
//   const moviesPerPage = 10; // Количество фильмов на странице

//   try {
//     const response = await axios.get(`${BASE_URL}search/movie?api_key=${KEY}&query=${searchTerm}&page=${currentPage}`);
//     const { results: movies, total_pages: totalPages } = response.data;

//     if (movies.length === 0) {
//       movieList.innerHTML = '<p>OOPS...We are very sorry!We don’t have any results due to your search.</p>';
//       pagination.innerHTML = '';
//     } else {
//       const start = (currentPage - 1) * moviesPerPage; // Индекс первого отображаемого фильма
//       const end = start + moviesPerPage; // Индекс последнего отображаемого фильма
//       const displayedMovies = movies.slice(start, end); // Отображаемые фильмы

//       movieList.innerHTML = '';
//       const promises = displayedMovies.map(async (movie) => {
//         try {
//           const { data: movieDetails } = await axios.get(
//             `${BASE_URL}movie/${movie.id}?api_key=${KEY}`
//           );
//           const movieHtml = movieTemplate({ ...movie, ...movieDetails });
//           movieList.insertAdjacentHTML('beforeend', movieHtml);
//         } catch (error) {
//           console.error(error);
//         }
//       });
//       await Promise.all(promises);

//       const paginationHtml = generatePagination(totalPages, currentPage);
//       pagination.innerHTML = paginationHtml;

//       pagination.addEventListener('click', function(event) {
//         if (event.target.tagName === 'A') {
//           const pageNumber = event.target.dataset.page;
//           searchMovies(event, pageNumber);
//         }
//       });

//       searchInput.value = '';
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

//   const searchForm = document.querySelector('.catalog__search form');

//   searchForm.addEventListener('submit', searchMovies);

//   function movieTemplate(movie) {
//   return `<li>
//             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
//             <h3>${movie.title}</h3>
//             <p>${movie.overview}</p>
//             <span>${movie.vote_average}</span>
//             <span>${movie.genres.slice(0, 2).map(genre => genre.name).join(', ')}</span>
//           </li>`;
// }

//   fetchTrendingMovies();

// function generatePagination(totalPages, currentPage) {
//   if (totalPages <= 1) {
//     return '';
//   }
//   let paginationHtml = '<div class="pagination">';
//   for (let i = 1; i <= totalPages; i++) {
//     if (i === currentPage) {
//       paginationHtml += `<span>${i}</span>`;
//     } else {
//       paginationHtml += `<a href="#" data-page="${i}">${i}</a>`;
//     }
//   }
//   paginationHtml += '</div>';
//   return paginationHtml;
// }

import { KEY } from './api-key';
const BASE_URL = 'https://api.themoviedb.org/3';

const API_URL_TRENDING = `${BASE_URL}/trending/movie/day?api_key=${KEY}`;
const API_URL_SEARCH = `${BASE_URL}/search/movie?api_key=${KEY}&query=`;

let currentPage = 1;
const moviesPerPage = 10;
let totalMovies = 0;

getMovies(API_URL_TRENDING);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  totalMovies = respData.total_results;
  showMovies(respData.results);
  displayPagination();
  currentPage = 1; // Reset currentPage to 1 after fetching new movies
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies');

  // Clear previous movies
  moviesEl.innerHTML = '';

  data.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <div class="movie__cover-inner">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="movie__cover"
          alt="${movie.title}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.title}</div>
        <div class="movie__category">${movie.genre_ids}</div>
        ${
          movie.vote_average &&
          `
          <div class="movie__average movie__average--${getClassByRate(
            movie.vote_average
          )}">${movie.vote_average}</div>
        `
        }
      </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}

function displayPagination() {
  const paginationEl = document.querySelector('.pagination');
  const pagesCount = Math.ceil(totalMovies / moviesPerPage);
  const ulEl = document.createElement('ul');
  ulEl.classList.add('pagination__list');

  // Determine the maximum number of buttons to display
  const maxButtons = 4;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(startPage + maxButtons - 1, pagesCount);

  for (let i = startPage; i <= endPage; i++) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = i;
    if (i === currentPage) {
      liEl.classList.add('pagination__item--active');
    }
    liEl.addEventListener('click', () => {
      currentPage = i;
      const url = `${API_URL_TRENDING}&page=${currentPage}`;
      getMovies(url);
    });
    ulEl.appendChild(liEl);
  }
  paginationEl.innerHTML = '';
  paginationEl.appendChild(ulEl);
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchKeyword = search.value;
  if (searchKeyword) {
    const apiSearchUrl = `${API_URL_SEARCH}${searchKeyword}&api_key=${KEY}`;
    getMovies(apiSearchUrl);

    search.value = '';
  }
});
