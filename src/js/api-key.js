const KEY = '0d9ddfeb4636025259fcaee6725b8ad3';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = `https://image.tmdb.org/t/p`;
const UPCOMING_URL = `${BASE_URL}/movie/upcoming`;
const IMG_W400 = `/w400`;

export { KEY, BASE_URL,  IMG_BASE_URL,  IMG_W400, UPCOMING_URL};

//  Підказка для посилань з ТЗ
// https://api.themoviedb.org/3/trending/ - Трендові фільми дня/тижня
// https://api.themoviedb.org/3/movie/upcoming/ - Нові фільми
// https://api.themoviedb.org/3/search/movie/ - Фільми за ключовим словом
// https://api.themoviedb.org/3/movie/ - Детальна інформація про фільм
// https://api.themoviedb.org/3/movie/ - Повна інформація про можливий трейлер фільма на YouTube
// https://api.themoviedb.org/3/genre/movie/list - Перелік жанрів
// https://api.themoviedb.org/3/configuration/countries - Перелік країн
