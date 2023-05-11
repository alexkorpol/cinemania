import axios from 'axios';
import { cards } from './refs';
import { saveLocSt } from './storage';
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-key';
import { emptyStar, fullStar, halfStar } from './star';

export async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return data;
}

export async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}

export function renderMarkup(data) {
  getGenres().then(({ genres }) => {
    
    //ADD localStorage
    saveLocSt('genresList', genres);
    if (data.results) {
      data.results.forEach(film => {
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
    }
    const markupList = createListMarkup(data.results);
    if (cards) {
      cards.innerHTML = markupList;
    }
  });
}

export function createListMarkup(data) {
  if (data) {
    return data
      .map(
        ({
          original_title,
          poster_path,
          vote_average,
          id,
          genre_names,
          release_date,
        }) => {
          let posterPath = ``;
          if (poster_path) {
            posterPath = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
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

          return `<li class='cards-list__item hover-cursor' data-id='${id}'>
            <img
              class='cards-list__img'
              src='${posterPath}'
              alt='${original_title}'
              width
              loading='lazy'
              data-id='${id}'
            />
            <div class='cards-list__wrap'>
              <div class='cards-list__info'>
                <h2 class='cards-list__title'>${original_title}</h2>
                <div class='cards-list_second_line'>
                  <div class='cards-list__text'>
                    <p>${genre_names} | ${release_date}</p>
                </div>
              </div>
              </div>
              <div class='star-rate'>
                ${ratingStars}
              </div>     
            </div>
            </li>
            `;
        }
      )
      .join('');
  }
}
