import { getDayTrending, getVideos } from './api.js';
import * as basicLightbox from 'basiclightbox';


import black from '../img/hero-mask-dark/dark-hero-desktop.png';
import white from '../img/hero-mask-light/light-hero-desktop.png';

const emptyStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

const fullStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="rgba(248, 65, 25, 1)" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

const halfStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>
<path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>
<defs>
<linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
<linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

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
          }" alt="Hero image" class="backend" />
          <img src="${black}" class="black" />
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
