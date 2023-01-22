import {
  createMarkupFilmsList,
  createMarkupLibraryList,
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
import { DataService } from './js/data-service';

const movieServise = new MoviesApiServise(); // create new instance Class API Service
const modalServise = new ModalServise(); // create new instance Class Modal Service
const localStorage = new LocalStorageService(); // create new instance Class LocalStorage Service
const dataService = new DataService(); // create new instance Class Data Service

const queueMovieIds = localStorage.load(localStorage.queueKey);
console.log(queueMovieIds);

movieServise
  .fetchQueueMovies(queueMovieIds)
  .then(handleQueueMovie)
  .catch(handleError)
  .finally(() => {
    // here should be spinner.close
  });

function handleQueueMovie(movies) {
  const necessaryData = movies.map(({ data }) => {
    return dataService.getDataSelectedMovie(data);
  });
  console.log('necessaryData', necessaryData);

  showQueueMovies(necessaryData);
}

function showQueueMovies(movies) {
  const markupQueueMovies = createMarkupLibraryList(movies); // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  refs.libraryList.innerHTML = markupQueueMovies;
}

function handleError(err) {
  console.error(err.message);
  // here should be Notify message
  console.log('Oops, something went wrong library page');
}
