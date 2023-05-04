import axios from 'axios';
const moviesOfWeek = {
  section: document.querySelector('home'),
  page: 1,
  moviesArray: [],
  url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=c4db8ccc58a0592251aa55d706d65408',
  async getMovies() {
    const response = (await axios.get(this.url)).data;
    console.log(response.results);
    return response;
  },
};
moviesOfWeek.getMovies();
