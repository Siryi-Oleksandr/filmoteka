import {
  createMarkupFilmsList,
  createMarkupSelectedMovie,
  trimGenresList,
  createMarkupSearchedList,
} from './js/card-markup';
import { refs } from './js/refs';
import {
  MoviesApiServise,
  baseImgUrl,
  imgPosterSize,
} from './js/search-servise';
import { ModalServise } from './js/modal-servise';
import { LocalStorageService } from './js/localStorage-service';

const movieServise = new MoviesApiServise(); // create new instance Class API Service
const modalServise = new ModalServise(); // create new instance Class Modal Service
const localStorage = new LocalStorageService(); // create new instance Class LocalStorage Service

const queueMovieIds = localStorage.load(localStorage.queueKey);
console.log(queueMovieIds);

movieServise
  .fetchQueueMovies(queueMovieIds)
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => {
    // here should be spinner.close
  });

function handleQueueMovie() {}
