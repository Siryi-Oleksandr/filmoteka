import {
  createMarkupFilmsList,
  createMarkupSelectedMovie,
} from './js/card-markup';
import { refs } from './js/refs';
import {
  MoviesApiServise,
  baseImgUrl,
  imgPosterSize,
} from './js/search-servise';

const movieServise = new MoviesApiServise(); // create new instance Class API Service

refs.moviesList.addEventListener('click', onFetchCurrentMovie); // TODO

// ! main fetch

movieServise
  .fetchTrendMovies()
  .then(handleTrendMovies)
  .catch(handleError)
  .finally(() => {
    // here should be spinner.close
  });

// ! Selected movie
function onFetchCurrentMovie(evt) {
  if (!evt.target.closest('.js-target')) {
    return;
  }

  const selectedMovieId = evt.target.closest('.js-target').dataset.id; // catch user click on li

  movieServise
    .fetchSelectedMovie(selectedMovieId)
    .then(handleSelectedMovie)
    .catch(handleError)
    .finally(() => {
      // here should be spinner.close
    });
}

// ! Set functions

function handleTrendMovies(data) {
  const { results } = data[0]; // get movies from first promise
  const { genres } = data[1]; // get genres from second promise

  const necessaryData = getDataTrendMovies(results, genres);
  showTrendMovies(necessaryData);
}

function handleSelectedMovie(data) {
  const necessaryData = getDataSelectedMovie(data);
  showSelectedMovie(necessaryData);
  toggleModal();
  refs.closeModalBtn.addEventListener('click', toggleModal); // TODO
}

function showTrendMovies(movies) {
  const markupTrendMovies = createMarkupFilmsList(movies);
  refs.moviesList.innerHTML = markupTrendMovies;
}

function showSelectedMovie(movie) {
  const markupSelectedMovie = createMarkupSelectedMovie(movie);
  refs.modalContainer.innerHTML = markupSelectedMovie;
}

// function which handle respose data from API and return necessary data
function getDataTrendMovies(results, allGenres) {
  return results.map(
    ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
      const imgUrl = baseImgUrl + imgPosterSize + poster_path;
      const genres = getTrendMovieGenres(genre_ids, allGenres);

      return {
        imgUrl: imgUrl,
        genres: genres,
        rating: vote_average.toFixed(1),
        name: title,
        id: id,
        year: Number.parseInt(release_date),
      };
    }
  );
}

function getDataSelectedMovie(data) {
  const {
    poster_path,
    genres,
    vote_average,
    vote_count,
    popularity,
    title,
    original_title,
    overview,
  } = data;

  const imgUrl = baseImgUrl + imgPosterSize + poster_path;

  return {
    imgUrl: imgUrl,
    name: title,
    vote: vote_average.toFixed(1),
    votes: vote_count,
    popularity: popularity,
    originalTitle: original_title,
    genres: getSelectedMovieGenres(genres),
    about: overview,
  };
}

function getTrendMovieGenres(genreIds, allGenres) {
  const result = [];

  genreIds.find(genreId => {
    allGenres.forEach(genre => {
      if (genre.id === genreId) {
        result.push(genre.name);
      }
    });
  });

  return result;
}

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

function getSelectedMovieGenres(arr) {
  return arr.map(el => el.name).join(', ');
}

function handleError() {
  err => console.log(err);
  // here should be Notify message
  console.log('Oops, something went wrong');
}
