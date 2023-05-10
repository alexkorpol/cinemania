import axios from 'axios';
import { KEY } from './api-key';
import { renderModal } from './global-modal';
import Pagination from 'tui-pagination';
import { renderModal } from './global-modal';
// import { getDetailFilm } from './home-weekly';


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

const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const modal = document.querySelector('.modal-weekly');
const closeButton = document.querySelector('.close');
const modalPoster = document.querySelector('.modal-weekly__poster');


let searchPage = 1;
let query = '';
let searchFilms = true;
let totalItems = 0;

function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}

const saveSerialized = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(error.message);
  }
};

async function fetchMovieSearcher(text, page) {
  try {
    const { data } = await axios.get(
      `${SEARCH_URL}?api_key=${KEY}&query=${text}&page=${page}`
    );
  data.results = data.results.slice(0, 10);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${KEY}`
  );

  return data;
}

async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}

function renderMarkupList(data) {
  getGenres().then(({ genres }) => {
    saveSerialized('genresList', genres);
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


async function createListMarkup(data) {
  const { genres: genreName } = await getGenres();
  let movieArray = [];

  for (let i = 0; i < data.length; i++) {
    const {
      original_title,
      genre_ids,
      release_date,
      poster_path,
      vote_average,
      title,
      id,
    } = data[i];
    let genres = [];

    for (let j = 0; j < genreName.length; j++) {
      if (genre_ids.indexOf(genreName[j].id) !== -1) {
        genres.push(genreName[j].name);
      }
    }

    const sliced = genres.slice(0, 2);
    const slicedGenres = sliced.join(', ');

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
    movieArray.push(`
      <li class='cards-list__item hover-cursor' data-id='${id}'>
        <img
          class='cards-list__img'
          src='https://image.tmdb.org/t/p/w500${poster_path}'
          alt='${original_title}'
          width
          loading='lazy'
          data-id='${id}'
        />
        <div class='cards-list__wrap'>
          <div class='cards-list__info'>
            <h2 class='cards-list__title'>${title}</h2>
            <div class='cards-list_second_line'>
              <div class='cards-list__text'>
                <p>${slicedGenres} | ${release_date}</p>
              </div>
               <div class='star-rate'>
            ${ratingStars}
          </div> 
            </div>
          </div>
             
        </div>
      </li>
    `);
  }

  cards.insertAdjacentHTML('afterbegin', movieArray.join(''));

}

const cards = document.querySelector('#cards__list');

const form = document.querySelector('.search__form');

const loadSerialized = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error(error.message);
  }
};

const container = document.getElementById('tui-pagination-container');

const options = {
  totalItems: loadSerialized('totalItems'),
  itemsPerPage: 10,
  visiblePages: 4,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">...</a>',
  },
};
const pagination = new Pagination(container, options);

async function getTrendData(page) {
  try {
    const { data } = await axios.get(
      `${TREND_URL}?api_key=${KEY}&page=${page}`
    );
    data.results = data.results.slice(0, 10);
    return data;
  } catch (error) {
    console.error(error);
  }
}

getTrendData(searchPage).then(data => {
  renderMarkupList(data);
  saveSerialized('totalItems', data.total_results);
  saveSerialized('moviesData', data.results);
});

if (form) {
  form.addEventListener('submit', search);
}

function search(event) {
  event.preventDefault();
  query = event.currentTarget.elements.search.value.toLowerCase().trim();
  saveSerialized('query-pg', query);
  if (query == '') {
    form.reset();
  } else {
    form.reset();
  }

  fetchMovieSearcher(query, searchPage).then(data => {
    moviesDataUpdate(data);
    if (data.results.length < 1 || query === '') {
      form.reset();
      query = '';
      saveSerialized('query-pg', query);
    } else {
      searchFilms = false;
      totalItems = data.total_results;
      pagination._options.totalItems = totalItems;

      renderMarkupList(data);

      form.reset();
      pagination.reset();
    }
  });
}

pagination.on('afterMove', event => {
  const currentPage = event.page;
  if (searchFilms) {
    getTrendData(currentPage).then(data => {
      renderMarkupList(data), saveSerialized('moviesData', data.results);
    });
  } else {
    fetchMovieSearcher(query, currentPage).then(data => {
      moviesDataUpdate(data);
      if (data.results.length < 1 || query === '') {
        form.reset();
        query = '';
        saveSerialized('query-pg', query);
      } else {
        searchFilms = false;
        renderMarkupList(data);
        form.reset();
      }
    });
  }
});


cards.addEventListener('click', async evt => {
  modal.classList.remove('is-hidden');
  const id = evt.target.dataset.id;
  const movie = await getDetailFilm(id);
  renderModal(movie);
  closeButton.addEventListener('click', () => {
    modal.classList.add('is-hidden');
    modalPoster.innerHTML = '';
  });
});

async function getDetailFilm(movie_id) {
  const response = await axios.get(
    `${BASE_URL}/movie/${movie_id}?api_key=${KEY}&language=en-US`
  );
  return response.data;
}
