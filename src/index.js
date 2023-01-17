import { createMarkupFilmsList } from './js/card-markup';

const API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';

//  https://api.themoviedb.org/3/trending/movie/day?api_key=d03712107dcdd723f1173c5ee2c0d8c1
// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
//  https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg //poster

const refs = {
  list: document.querySelector('.js-films-list'),
};

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

const baseImgUrl = `https://image.tmdb.org/t/p/`;
const imgPosterSize = `w500`;
// ! main fetch
fetchTrendMovies().then(handleTrendMovies).catch(handleError);

function handleTrendMovies(data) {
  const { results } = data;
  const necessaryData = getNecessaryData(results);
  console.log(necessaryData);
  showTrendMovies(necessaryData);

  // return results.map(({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
  //   const imgUrl = baseImgUrl + imgPosterSize + poster_path;

  //   return imgUrl;
  // });
}

function showTrendMovies(movies) {
  const markup = createMarkupFilmsList(movies);
  refs.list.innerHTML = markup;
}

function getNecessaryData(results) {
  return results.map(
    ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
      const necessaryData = {};

      const imgUrl = baseImgUrl + imgPosterSize + poster_path;

      return {
        imgUrl: imgUrl,
        genres: genre_ids,
        rating: vote_average,
        name: title,
        id: id,
        year: Number.parseInt(release_date),
      };
    }
  );
}

// const genres = getGenresList().then(data => {
//   console.log(data.genres);

//   return data.genres;
// });
// console.log(genres);

function handleError() {
  err => console.log(err);
}
