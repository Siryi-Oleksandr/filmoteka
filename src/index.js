import { createMarkupFilmsList } from './js/card-markup';
import { refs } from './js/refs';
import {
  MoviesApiServise,
  fetchTrendMovies,
  baseImgUrl,
  imgPosterSize,
} from './js/search-servise';

// ! EventListeners
const movieServise = new MoviesApiServise();

refs.moviesList.addEventListener('click', onFetchCurrentMovie);

async function onFetchCurrentMovie(evt) {
  if (!evt.target.closest('.js-target')) {
    return;
  }
  const selectedMovieId = evt.target.closest('.js-target').dataset.id; // catch user click on li
  console.log(selectedMovieId);

  movieServise.fetchSelectedMovie(selectedMovieId);
}

// ! main fetch
fetchTrendMovies().then(handleTrendMovies).catch(handleError);

// ! Set functions

function handleTrendMovies(data) {
  const { results } = data[0]; // get movies from first promise
  const { genres } = data[1]; // get genres from second promise

  const necessaryData = getNecessaryData(results, genres);
  showTrendMovies(necessaryData);
}

function showTrendMovies(movies) {
  const markupTrendMovies = createMarkupFilmsList(movies);
  refs.moviesList.innerHTML = markupTrendMovies;
}

// function which handle respose data from API and return necessary data
function getNecessaryData(results, allGenres) {
  return results.map(
    ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
      const imgUrl = baseImgUrl + imgPosterSize + poster_path;
      const genres = findCurrentGenres(genre_ids, allGenres);

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

function findCurrentGenres(genreIds, allGenres) {
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

function handleError() {
  err => console.log(err);
  // here should be Notify message
}
