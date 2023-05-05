import { KEY } from "./api-key";
import { BASE_URL } from "./api-key";
import filmCardTpl from "../templatels/hero-card-film.hbs";
import axios from 'axios';
const refs = {
cardHeroContainer : document.querySelector('.card'),
};

fetchFilm().then(renderFilmCard).catch(error =>{
    console.log(error);
});;

function fetchFilm (filmId){
   return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`)
    .then(response =>{
    return response.json();
})

}



function renderFilmCard (films){
    const markup = filmCardTpl(films)
    
    refs.cardHeroContainer.innerHTML = markup;
}








 







const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}

function initRatings() {
    let ratingActive, ratingValue;
    for ( let i = 0; i <ratings.length; i ++){
        const rating = ratings[i];
        initRatings(rating);
    

}function initRatings(rating){
initRatingsCons(rating);

setRatingActiveWidth();
}

function initRatingsCons(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');

}

function setRatingActiveWidth(i = ratingValue.innerHTML){
    const ratingActiveWidth = i /0.10;
    ratingActive.style.width = `${ratingActiveWidth}%`;
}
}
