  import axios from 'axios';
  import { KEY } from "./api-key";


  const BASE_URL = 'https://api.themoviedb.org/3/';
  const searchInput = document.getElementById('searchInput');
  const movieList = document.querySelector('#movie-list');
  const pagination = document.querySelector('.pagination')


  async function fetchTrendingMovies() {
  try {
    const response = await axios.get(`${BASE_URL}trending/movie/week?api_key=${KEY}`);
    const movies = response.data.results;
    for (const movie of movies) {
      try {
        const { data: movieDetails } = await axios.get(
          `${BASE_URL}movie/${movie.id}?api_key=${KEY}`
        );
        const movieHtml = movieTemplate({ ...movie, ...movieDetails });
        movieList.insertAdjacentHTML('beforeend', movieHtml);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
// async function searchMovies(event, currentPage = 1) {
//   event.preventDefault();
//   const searchTerm = searchInput.value;
//   const moviesPerPage = 10; // Количество фильмов на странице

//   try {
//     const response = await axios.get(`${BASE_URL}search/movie?api_key=${KEY}&query=${searchTerm}`);
//     const movies = response.data.results;
//     const totalPages = Math.ceil(movies.length / moviesPerPage); // Общее количество страниц

//     if (movies.length === 0) {
//       movieList.innerHTML = '<p>Search result not successful. Enter the correct movie name and try again.</p>';
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
//       movieList.insertAdjacentHTML('afterend', paginationHtml);

//       pagination.addEventListener('click', function(event) {
//         if (event.target.tagName === 'A') {
//         const pageNumber = event.target.dataset.page;
//         searchMovies(event, pageNumber);
//        }
//       });

//       searchInput.value = '';
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

async function searchMovies(event, currentPage = 1) {
  event.preventDefault();
  const searchTerm = searchInput.value;
  const moviesPerPage = 10; // Количество фильмов на странице

  try {
    const response = await axios.get(`${BASE_URL}search/movie?api_key=${KEY}&query=${searchTerm}&page=${currentPage}`);
    const { results: movies, total_pages: totalPages } = response.data;

    if (movies.length === 0) {
      movieList.innerHTML = '<p>OOPS...We are very sorry!We don’t have any results due to your search.</p>';
      pagination.innerHTML = '';
    } else {
      const start = (currentPage - 1) * moviesPerPage; // Индекс первого отображаемого фильма
      const end = start + moviesPerPage; // Индекс последнего отображаемого фильма
      const displayedMovies = movies.slice(start, end); // Отображаемые фильмы

      movieList.innerHTML = '';
      const promises = displayedMovies.map(async (movie) => {
        try {
          const { data: movieDetails } = await axios.get(
            `${BASE_URL}movie/${movie.id}?api_key=${KEY}`
          );
          const movieHtml = movieTemplate({ ...movie, ...movieDetails });
          movieList.insertAdjacentHTML('beforeend', movieHtml);
        } catch (error) {
          console.error(error);
        }
      });
      await Promise.all(promises);

      const paginationHtml = generatePagination(totalPages, currentPage);
      pagination.innerHTML = paginationHtml;

      pagination.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
          const pageNumber = event.target.dataset.page;
          searchMovies(event, pageNumber);
        }
      });

      searchInput.value = '';
    }
  } catch (error) {
    console.error(error);
  }
}



  const searchForm = document.querySelector('.catalog__search form');
  searchForm.addEventListener('submit', searchMovies);

  function movieTemplate(movie) {
  return `<li>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <span>${movie.vote_average}</span>
            <span>${movie.genres.slice(0, 2).map(genre => genre.name).join(', ')}</span>
          </li>`;
}

  fetchTrendingMovies();

function generatePagination(totalPages, currentPage) {
  if (totalPages <= 1) {
    return '';
  }
  let paginationHtml = '<div class="pagination">';
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHtml += `<span>${i}</span>`;
    } else {
      paginationHtml += `<a href="#" data-page="${i}">${i}</a>`;
    }
  }
  paginationHtml += '</div>';
  return paginationHtml;
}