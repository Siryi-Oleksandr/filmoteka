import { createMarkupLibraryList } from './js/card-markup';
import { refs } from './js/refs';
import { MoviesApiServise } from './js/search-servise';
import { ModalServise } from './js/modal-servise';
import { LocalStorageService } from './js/localStorage-service';
import { DataService } from './js/data-service';

const movieServise = new MoviesApiServise(); // create new instance Class API Service
const modalServise = new ModalServise(); // create new instance Class Modal Service
const localStorage = new LocalStorageService(); // create new instance Class LocalStorage Service
const dataService = new DataService(); // create new instance Class Data Service

const queueMovieIds = localStorage.load(localStorage.queueKey);
const watchedMovieIds = localStorage.load(localStorage.watchedKey);

refs.btnQueue.addEventListener('click', onShowQueueMovies);
refs.btnWatched.addEventListener('click', onShowWatchedMovies);

// ! Default Render Library Page
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
  showQueueMovies(necessaryData);
}

function showQueueMovies(movies) {
  const markupQueueMovies = createMarkupLibraryList(movies);
  refs.libraryList.innerHTML = markupQueueMovies;
}

function onShowQueueMovies() {
  refs.btnQueue.classList.add('is-active');
  refs.btnWatched.classList.remove('is-active');
  movieServise
    .fetchQueueMovies(queueMovieIds)
    .then(handleQueueMovie)
    .catch(handleError)
    .finally(() => {
      // here should be spinner.close
    });
}
function onShowWatchedMovies() {
  refs.btnWatched.classList.add('is-active');
  refs.btnQueue.classList.remove('is-active');
  movieServise
    .fetchQueueMovies(watchedMovieIds)
    .then(handleQueueMovie)
    .catch(handleError)
    .finally(() => {
      // here should be spinner.close
    });
}

function handleError(err) {
  console.error(err.message);
  // here should be Notify message
  console.log('Oops, something went wrong library page');
}
