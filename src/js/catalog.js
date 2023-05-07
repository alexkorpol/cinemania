  import axios from 'axios';
  import { KEY } from "./api-key";


  const BASE_URL = 'https://api.themoviedb.org/3/';
  const searchInput = document.getElementById('searchInput');
  const movieList = document.querySelector('#movie-list');


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

  async function searchMovies(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;

    try {
      const response =  await axios.get(`${BASE_URL}search/movie?api_key=${KEY}&query=${searchTerm}`);
      const movies = response.data.results;

      if (movies.length === 0) {
        movieList.innerHTML = '<p>Search result not successful. Enter the correct movie name and try again.</p>';
      } else {
        movieList.innerHTML = '';
        const promises = movies.map(async movie => {
      try {
        const { data: movieDetails } = await axios.get(`${BASE_URL}movie/${movie.id}?api_key=${KEY}`,
    );
        const movieHtml = movieTemplate({ ...movie, ...movieDetails });
        movieList.insertAdjacentHTML('beforeend', movieHtml);
  } catch (error) {
    console.error(error);
  }
});
        await Promise.all(promises);
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

