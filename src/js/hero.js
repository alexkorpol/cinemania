import { KEY } from "./api-key";
import { BASE_URL } from "./api-key";
import axios from 'axios';


const moviesOfWeek = {
  section: document.querySelector('hero'),
  page: 1,
  moviesArray: [],
  url: `${BASE_URL}/trending/movie/day?api_key=${KEY}`,
  async getMovies() {
    const response = (await axios.get(this.url)).data;
    return response;
  },

};

const refs = {
cardHeroContainer : document.querySelector('.card'),
};
    moviesOfWeek.getMovies().then(response =>{
        console.log(response)
    
    
    
    });


 















// `<section class="hero container"> 
   
//    <div class="hero__trends">
//        <img>
//        <h2 class="hero__title">${title}</h2>

//        <div class="rating">
//            <div class="rating__body">
//                <div class="rating__active"></div>
//                   <div class="rating__items">
//                    <input type="radio" class="rating__item" value="1" name="rating">
//                    <!-- <svg width="18" height="18" class="rating__body-svg">
//                        <use href="./img/symbol-defs.svg#icon-star-rating"></use>
//                    </svg> -->
//                    <input type="radio" class="rating__item" value="2" name="rating">
//                    <!-- <svg width="18" height="18" class="rating__body-svg">
//                        <use href="./img/symbol-defs.svg#icon-star-rating"></use>
//                    </svg> -->
//                    <input type="radio" class="rating__item" value="3" name="rating">
//                    <!-- <svg width="18" height="18" class="rating__body-svg">
//                        <use href="./img/symbol-defs.svg#icon-star-rating"></use>
//                    </svg> -->
//                    <input type="radio" class="rating__item" value="4" name="rating">
//                    <!-- <svg width="18" height="18" class="rating__body-svg">
//                        <use href="./img/symbol-defs.svg#icon-star-rating"></use>
//                    </svg> -->
//                    <input type="radio" class="rating__item" value="5" name="rating">
//                    <!-- <svg width="18" height="18" class="rating__body-svg">
//                        <use href="./img/symbol-defs.svg#icon-star-rating"></use>
//                    </svg> -->
//                   </div>
           
//                <div class="rating__value ">7</div>
//        </div>
//        <p class="hero__overview">${overview} </p>
                  
//                   <button class="hero__btn-trailer">
//                Watch trailer
//            </button>
           
           
// </div>
// </div>
// </section>`
































// fetchFilm()
// .then(renderFilmCard)
// .catch(error =>{
//     console.log(error);
// });;

// function fetchFilm (filmId){
//    return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`)
//     .then(response =>{
//     return response.json();
// })

// }




// function renderFilmCard (films){
//     const markup = filmCardTpl(films)
//     console.log(films)
//     refs.cardHeroContainer.innerHTML = markup;
//     console.log(markup)
// }








 







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
