import axios from 'axios';
import { IMG_BASE_URL, BASE_URL, IMG_W400, KEY } from './api-key';
import { emptyStar, fullStar, halfStar } from './star';

const galleryList = document.querySelector('.gallery-weekly__list');

function getTrendData() {
  const URL =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=249f222afb1002186f4d88b2b5418b55';

  return axios.get(URL).then(data => {
    return data.data;
  });
}

async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${KEY}`
  );
  return data;
}

export async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}

function renderMarkup(results) {
  getGenres().then(({ genres }) => {
    if (results) {
      results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1);
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
      const markupList = createMarkup(results);
      if (galleryList) {
        galleryList.innerHTML = markupList;
      }
    }
  });
}

function createMarkup(results) {
  return results
    .slice(0, 3)
    .map(
      ({
        original_title,
        release_date,
        genre_ids,
        poster_path,
        vote_average,
        id,
      }) => {
        let posterIMG = ``;
        if (poster_path) {
          posterIMG = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
        }

        let ratingStars = '';

        const rating = Math.round(vote_average);

        switch (rating) {
          case 0:
            ratingStars = `${emptyStar.repeat(5)}`;
            break;
          case 1:
            ratingStars = `${halfStar}${emptyStar.repeat(4)}`;
            break;
          case 2:
            ratingStars = `${fullStar}${emptyStar.repeat(4)}`;
            break;
          case 3:
            ratingStars = `${fullStar}${halfStar}${emptyStar.repeat(3)}`;
            break;
          case 4:
            ratingStars = `${fullStar.repeat(2)}${emptyStar.repeat(3)}`;
            break;
          case 5:
            ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(
              2
            )}`;
            break;
          case 6:
            ratingStars = `${fullStar.repeat(3)}${emptyStar.repeat(2)}`;
            break;
          case 7:
            ratingStars = `${fullStar.repeat(3)}${halfStar}${emptyStar}`;
            break;
          case 8:
            ratingStars = `${fullStar.repeat(4)}${emptyStar}`;
            break;
          case 9:
            ratingStars = `${fullStar.repeat(4)}${halfStar}`;
            break;
          case 10:
            ratingStars = `${fullStar.repeat(5)}`;
            break;
          default:
            throw new Error('Invalid rating');
        }
        return ` <li class='gallery-weekly__list-elem hover-cursor' data-id='${id}'>           
        <img class='gallery-weekly__image' src="${posterIMG}" alt="${original_title}" loading="lazy" data-id='${id}'>
       <div class='gallery-weekly__all-info'> 
        <div class="gallery-weekly__info">
            <h3 class= 'gallery-weekly__title'>${original_title}</h3>
            <div class='cards-list_second_line'>
              <div class='cards-list__text'>
                <p>${genre_ids} | ${release_date}</p>
              </div>
            </div>
        </div>
        <div class='star-rate'>
                ${ratingStars}
        </div>
      </div>
    </li>`;
      }
    )
    .join('');
}
export const getWeeklyTrends = getTrendData().then(({ results }) => {
  return renderMarkup(results);
});
