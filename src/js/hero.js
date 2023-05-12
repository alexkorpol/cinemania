import { getDayTrending, getVideos } from './api.js';
import * as basicLightbox from 'basiclightbox';
import { emptyStar, fullStar, halfStar } from './star';

const hero = document.querySelector('.hero');

async function displayTrendingMovie() {
  try {
    const { results } = await getDayTrending(1);
    const movieOfDay = results[Math.floor(Math.random() * results.length)];

    createTrendingMarkup(movieOfDay);

    const trailerBtn = document.getElementById('trailer-btn');
    trailerBtn.addEventListener('click', async () => {
      try {
        const videos = await getVideos(movieOfDay.id);
        const infoTr = videos.find(el => el.name === 'Official Trailer');

        if (!infoTr) {
          throw new Error('Trailer not found');
        }

        const keyTr = infoTr.key;
        const instance = basicLightbox.create(`
          <iframe class="iframe" src="https://www.youtube.com/embed/${keyTr}" width="560" height="315" frameborder="0"></iframe>
        `);

        instance.show(() => console.log('lightbox now visible'));
      } catch (error) {
        const instance = basicLightbox.create(`
          <div class="notification-trailer-fail">
            <p class="notification-trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>
            <button type="button" class="btn-close"><svg class="btn-close--svg" width=24 height=24>
            <use href='../../img/sprite.svg#icon-x-button'></use>
        </svg>
      </button>
            <div class="bg-box"></div>
          </div>
        `);

        instance.show(() => console.log('lightbox now visible'));
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function createTrendingMarkup(movieOfDay) {
  let ratingStars = '';

  const rating = Math.round(movieOfDay.vote_average);

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
      ratingStars = `${fullStar.repeat(2)}${halfStar}${emptyStar.repeat(2)}`;
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
  const markup = `
    <div class="hero-wrap">
      <div class="thumb">
        <div class="background-image">
          <img src="https://image.tmdb.org/t/p/original${
            movieOfDay.backdrop_path
          }" alt="Hero image" class="backend" loading="lazy" />
        </div>
        <div class="hero-wrap__content">
          <h1 class="title">${movieOfDay.title || movieOfDay.name}</h1>
          <div class='start-rate__hero'>
            ${ratingStars}
          </div> 
          <p class="description">${movieOfDay.overview}</p>
          <button class="watch-trailer__btn" id="trailer-btn" data-btn="trailer-fail">Watch trailer</button>
        </div>
      </div>
    </div>
  `;

  hero.innerHTML = markup;
}

displayTrendingMovie();
