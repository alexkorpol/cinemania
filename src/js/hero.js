import { KEY } from "./api-key";

const BASE_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}&page=1`;
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

fetchMovieOfTheDay();

function fetchMovieOfTheDay() {
    return fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
      makeMovieOfTheDay(data);
      }).catch(error => console.log(error))
  }

  const heroEl = document.body.querySelector(".hero");
  const heroContainer = document.body.querySelector('.hero__container');
  const heroFilm = document.body.querySelector('.hero__with-film');

  function makeMovieOfTheDay(data) {
    try {
      if (data) {
          console.log(data);
          const valueOfElements = data.results.length - 1
          console.log(valueOfElements);
  
          const movieNumber = Math.round(getRandomNumber(0, valueOfElements));
          console.log(movieNumber);
  
          const film = data.results[movieNumber];
          console.log(film);

          heroContainer.innerHTML = '';
          makeMarkup(film)
        } 
    } catch (error) {
        console.log(error);
        heroEl.classList.remove("hero__with-film");
        heroEl.classList.add("hero__default");
    }
  }
  
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function makeMarkup(film) {
    heroContainer.innerHTML = `<div class="hero__box">
    <h2 class="hero__title">${film.title}</h2>
    <p class="rating__value">${film.vote_average}</p>
    <p class="hero__overview">${film.overview}</p>
    <button class="hero__btn ">Watch trailer</button></div>
    <div class=""></div>
    `

    
    window.addEventListener('load', setHeroBackground(film));
    window.addEventListener('resize', setHeroBackground(film));
  }
  

  function setHeroBackground(film) {
    const windowWidth = window.innerWidth;
  
    
    if (windowWidth <= 768) {
      heroFilm.style.backgroundImage = `linear-gradient(87.8deg, #0e0e0e 15.61%, rgba(14, 14, 14, 0) 60.39%), url('${IMG_URL}${film.backdrop_path}')`;
    } else if(windowWidth >= 769) {
      heroFilm.style.backgroundImage = `url('${IMG_URL}${film.backdrop_path}')`;
    } else if(windowWidth >= 1200) {
      heroFilm.style.backgroundImage = ` url('${IMG_URL}${film.backdrop_path}')`;
    }
  }

// ================== rating ==================

// const ratings = document.querySelectorAll('.rating');
// if (ratings.length > 0) {
//     initRatings();
// }

// function initRatings() {
//     let ratingActive, ratingValue;
//     for ( let i = 0; i <ratings.length; i ++){
//         const rating = ratings[i];
//         initRatings(rating);

// }function initRatings(rating){
// initRatingsCons(rating);

// setRatingActiveWidth();
// }

// function initRatingsCons(rating) {
//     ratingActive = rating.querySelector('.rating__active');
//     ratingValue = rating.querySelector('.rating__value');

// }

// function setRatingActiveWidth(i = ratingValue.innerHTML){
//     const ratingActiveWidth = i /0.10;
//     ratingActive.style.width = `${ratingActiveWidth}%`;
// }
// }
