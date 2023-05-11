import axios from 'axios';
import { KEY, BASE_URL } from './api-key';


export async function getDayTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getVideos(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}/videos?api_key=${KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {});
}

// Фетч фильма по его ID
export async function getMovieById(id) {
  try {
    const { data } = await axios.get(`${ID_URL}${id}?api_key=${KEY}`);

    const result = {
      ...data,
      year: createYear(data),
      customGenres: createGenresFromID(data),
    };

    return result;
  } catch (error) {
    console.error('Smth wrong with api ID fetch' + error);
  }
}

export const getSecondMovieById = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`
    );
    const result = {
      ...data,
    };
    return result;
  } catch (error) {
    console.error('Smth wrong with api ID fetch' + error);
  }
};