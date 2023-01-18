/* import { createMarkupFilmsList } from './js/card-markup';

const API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';

//  https://api.themoviedb.org/3/trending/movie/day?api_key=d03712107dcdd723f1173c5ee2c0d8c1
// https://api.themoviedb.org/3/genre/movie/list?api_key=d03712107dcdd723f1173c5ee2c0d8c1&language=en-US
//  https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg //poster

const refs = {
  moviesList: document.querySelector('.js-films-list'),
};

const baseImgUrl = `https://image.tmdb.org/t/p/`;
const imgPosterSize = `w500`;
// ! main fetch
fetchTrendMovies().then(handleTrendMovies).catch(handleError);

// ! Set functions
async function fetchTrendMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=d03712107dcdd723f1173c5ee2c0d8c1'
  );
  const movies = await response.json();
  return movies;
}

async function getGenresList() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=d03712107dcdd723f1173c5ee2c0d8c1&language=en-US'
  );
  const genres = await response.json();
  return genres;
}

// getGenresList().then(handleGenresList);

function handleGenresList(data) {
  const { genres } = data;
  console.log(genres);
  return genres;
}

function handleTrendMovies(data) {
  const { results } = data;
  const necessaryData = getNecessaryData(results);
  showTrendMovies(necessaryData);
}

function showTrendMovies(movies) {
  const markupTrendMovies = createMarkupFilmsList(movies);
  refs.moviesList.innerHTML = markupTrendMovies;
}

function getNecessaryData(results) {
  return results.map(
    ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
      const imgUrl = baseImgUrl + imgPosterSize + poster_path;
      const genres = filterActualyGenres(genre_ids);
      console.log(genres);

      return {
        imgUrl: imgUrl,
        genres: genres,
        rating: vote_average.toFixed(2),
        name: title,
        id: id,
        year: Number.parseInt(release_date),
      };
    }
  );
}

async function filterActualyGenres(genreIds) {
  const result = [];
  await getGenresList().then(({ genres }) => {
    genreIds.find(genreId => {
      genres.forEach(genre => {
        if (genre.id === genreId) {
          result.push(genre.name);
        }
      });
    });
  });
  console.log(result);

  return result;
}
// const encryptionGenres = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
// ];
// const genre_ids = [14, 6, 99];

// filterActualyGenres();

function handleError() {
  err => console.log(err);
} */

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { createMarkupFilmsList } from './js/card-markup';

const API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';

//  https://api.themoviedb.org/3/trending/movie/day?api_key=d03712107dcdd723f1173c5ee2c0d8c1
// https://api.themoviedb.org/3/genre/movie/list?api_key=d03712107dcdd723f1173c5ee2c0d8c1&language=en-US
//  https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg //poster

const refs = {
  moviesList: document.querySelector('.js-films-list'),
};

const baseImgUrl = `https://image.tmdb.org/t/p/`;
const imgPosterSize = `w500`;
// ! main fetch
fetchTrendMovies().then(handleTrendMovies).catch(handleError);

// ! Set functions
async function fetchTrendMovies() {
  const responseMovies = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=d03712107dcdd723f1173c5ee2c0d8c1'
  );
  const movies = await responseMovies.json();
  const responseGenres = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=d03712107dcdd723f1173c5ee2c0d8c1&language=en-US'
  );
  const genres = await responseGenres.json();
  return [movies, genres];
}

function handleTrendMovies(data) {
  const { results } = data[0];
  const { genres } = data[1];

  const necessaryData = getNecessaryData(results, genres);
  showTrendMovies(necessaryData);
}

function showTrendMovies(movies) {
  const markupTrendMovies = createMarkupFilmsList(movies);
  refs.moviesList.innerHTML = markupTrendMovies;
}

function getNecessaryData(results, allGenres) {
  return results.map(
    ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
      const imgUrl = baseImgUrl + imgPosterSize + poster_path;
      const genres = filterActualyGenres(genre_ids, allGenres);

      return {
        imgUrl: imgUrl,
        genres: genres,
        rating: vote_average.toFixed(2),
        name: title,
        id: id,
        year: Number.parseInt(release_date),
      };
    }
  );
}

function filterActualyGenres(genreIds, allGenres) {
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
}
