const API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';

const baseUrl = `https://api.themoviedb.org/3/`;
export const baseImgUrl = `https://image.tmdb.org/t/p/`;
export const imgPosterSize = `w500`;

export async function fetchTrendMovies() {
  try {
    const responseMovies = await fetch(
      `${baseUrl}trending/movie/day?api_key=${API_KEY}`
    );
    const movies = await responseMovies.json();

    const responseGenres = await fetch(
      `${baseUrl}genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const genres = await responseGenres.json();

    return [movies, genres]; // return in index.js two promises
  } catch (error) {
    console.error('Error', error.message);
    // here should be Notify failure message
  } finally {
    // here should be spinner.close()
  }
}
