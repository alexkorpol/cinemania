import { getDayTrending, getVideos } from './api.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';

import black from '../img/dark-hero-desktop.png';
import white from '../img/light-hero-desktop.png';

const hero = document.querySelector('.hero');
const LightSwitcher = document.querySelector('.switcher');

LightSwitcher.addEventListener('click', switchPhoto);

function switchPhoto() {
  const blackImage = document.querySelector('.black');
  const currentImageSrc = blackImage.getAttribute('src');
  const newImageSrc = currentImageSrc === black ? white : black;
  blackImage.setAttribute('src', newImageSrc);

  localStorage.setItem('imageColor', newImageSrc);
}

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
  const markup = `
    <div class="hero-wrap">
      <div class="thumb">
        <div class="background-image">
          <img src="https://image.tmdb.org/t/p/original${
            movieOfDay.backdrop_path
          }" alt="Hero image" class="backend" />
          <img src="${black}" class="black" />
        </div>
        <div class="hero-wrap__content">
          <h1 class="title">${movieOfDay.title || movieOfDay.name}</h1>
          <div class="catalog__stars-wrap">
            <div class="catalog__rating-active" style="width:${
              movieOfDay.vote_average / 2 / 0.05
            }%"></div>
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
