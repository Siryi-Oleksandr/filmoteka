import {
  createMarkupFilmsList,
  createMarkupSelectedMovie,
  createMarkupSearchedList,
} from './js/card-markup';
import { refs } from './js/refs';
import {
  MoviesApiServise,
  baseImgUrl,
  imgPosterSize,
} from './js/search-servise';
// import debounce from 'lodash.debounce';
import { ModalServise } from './js/modal-servise';
import { LocalStorageService } from './js/localStorage-service';
import { DataService } from './js/data-service';
import { spinnerPlay, spinnerStop } from './js/spinner';
import { onSearchSubmit } from './js/searchFunctions';
import { SearchMoviesAPI } from './js/searchFetch';

const movieServise = new MoviesApiServise(); // create new instance Class API Service
const modalServise = new ModalServise(); // create new instance Class Modal Service
const localStorage = new LocalStorageService(); // create new instance Class LocalStorage Service
const dataService = new DataService(); // create new instance Class Data Service
const searchMoviesAPI = new SearchMoviesAPI(); // search functionality

// ! add listeners
refs.moviesList.addEventListener('click', onFetchCurrentMovie);
refs.modalContainer.addEventListener('click', onAddToLibrary);

refs.searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();

  const searchValue = event.currentTarget.elements.query.value;
  console.log(searchValue);

  searchMoviesAPI.fetchSearchedMovie(searchValue);
}

// ! main fetch
spinnerPlay();
movieServise
  .fetchTrendMovies()
  .then(handleTrendMovies)
  .catch(handleError)
  .finally(() => {
    spinnerStop();
  });

// ! Selected movie
function onFetchCurrentMovie(evt) {
  if (!evt.target.closest('.js-target')) {
    return;
  }

  const selectedMovieId = evt.target.closest('.js-target').dataset.id; // catch user click on li
  spinnerPlay();
  movieServise
    .fetchSelectedMovie(selectedMovieId)
    .then(handleSelectedMovie)
    .catch(handleError)
    .finally(() => {
      spinnerStop();
    });
}

// ! Set functions

function handleTrendMovies(data) {
  const { results } = data[0]; // get movies from first promise
  const { genres } = data[1]; // get genres from second promise

  const necessaryData = dataService.getDataTrendMovies(results, genres);
  showTrendMovies(necessaryData);
}

function handleSelectedMovie(data) {
  const necessaryData = dataService.getDataSelectedMovie(data);
  showSelectedMovie(necessaryData);
  modalServise.openModal();
}

function showTrendMovies(movies) {
  const markupTrendMovies = createMarkupFilmsList(movies);
  refs.moviesList.innerHTML = markupTrendMovies;
}

function showSelectedMovie(movie) {
  const markupSelectedMovie = createMarkupSelectedMovie(movie);
  refs.modalContainer.innerHTML = markupSelectedMovie;
}

function onAddToLibrary(evt) {
  const isBtnAddToQueue = evt.target.name === 'add-to-queue';
  const isBtnAddToWatched = evt.target.name === 'add-to-watched';
  if (isBtnAddToQueue) {
    const movieToQueue = movieServise.selectedMovieId;
    localStorage.save(localStorage.queueKey, movieToQueue);
  }
  if (isBtnAddToWatched) {
    const movieToWatched = movieServise.selectedMovieId;
    localStorage.save(localStorage.watchedKey, movieToWatched);
  }
}

function handleError(err) {
  console.error(err.message);
  // here should be Notify message
  console.log('Oops, something went wrong main page');
}
