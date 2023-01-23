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
import debounce from 'lodash.debounce';
import { ModalServise } from './js/modal-servise';
import { LocalStorageService } from './js/localStorage-service';
import { DataService } from './js/data-service';
import { spinnerPlay, spinnerStop } from './js/spinner';

const movieServise = new MoviesApiServise(); // create new instance Class API Service
const modalServise = new ModalServise(); // create new instance Class Modal Service
const localStorage = new LocalStorageService(); // create new instance Class LocalStorage Service
const dataService = new DataService(); // create new instance Class Data Service

// ! add listeners
refs.moviesList.addEventListener('click', onFetchCurrentMovie);
refs.modalContainer.addEventListener('click', onAddToLibrary);

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

// Search reason functionality
// refs.searchForm.addEventListener('input', debounce(onSearchInput, 300));
// refs.searchForm.addEventListener('submit', onSearchSubmit);

// function onSearchSubmit(event) {
//   event.preventDefault();

//   // const value = event.currentTarget.elements.query.value;
//   const value = event.target.value;

//   console.dir(value);

//   if (!value) {
//     movieServise
//       .fetchTrendMovies()
//       .then(handleTrendMovies)
//       .catch(handleError)
//       .finally(() => {
//         // here should be spinner.close
//       });
//   }

//   movieServise
//     .fetchSearchedMovie(value)
//     .then(data => console.log(data))
//     .catch(handleError)
//     .finally(() => {
//       // here should be spinner.close
//     });

// return movieServise
//   .fetchSearchedMovie(value)
//   .then(({ results }) => {
//     const data = searchHandle(results);
//     const markup = createMarkupSearchedList(data);
//     refs.moviesList.innerHTML = markup;
//   })
//   .catch(handleError)
//   .finally(() => {
//     // here should be spinner.close
//   });
// }

// function searchHandle(data) {
//   return data.map(
//     ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
//       const imgUrl = baseImgUrl + imgPosterSize + poster_path;
//       const genres = trimGenresList(genre_ids);

//       return {
//         imgUrl: imgUrl,
//         genres: genres,
//         rating: vote_average.toFixed(1),
//         name: title,
//         id: id,
//         year: Number.parseInt(release_date),
//       };
//     }
//   );
// }
