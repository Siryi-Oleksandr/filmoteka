import axios from 'axios';

// const API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';
// const baseUrl = `https://api.themoviedb.org/3/`;

export const baseImgUrl = `https://image.tmdb.org/t/p/`;
export const imgPosterSize = `w500`;

export class MoviesApiServise {
  #API_KEY;
  constructor() {
    this.#API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';
    this.baseUrl = `https://api.themoviedb.org/3/`;
    this.axiosParams = {
      api_key: this.#API_KEY,
    };
    this.searchMovie = '';
    this.page = 1;
    this.selectedMovieId = null;
  }

  async fetchTrendMovies() {
    const responseMovies = await axios.get(
      `${this.baseUrl}trending/movie/day?api_key=${this.#API_KEY}`
    );

    const responseGenres = await axios.get(
      `${this.baseUrl}genre/movie/list?api_key=${this.#API_KEY}&language=en-US`
    );

    return [responseMovies.data, responseGenres.data]; // return in index.js two promises
    // in this methot we don't use construction try...catch becouse we handle result in outer code and use there then...catch...finally
  }

  async fetchSelectedMovie(id) {
    const response = await axios.get(`${this.baseUrl}movie/${id}`, {
      params: this.axiosParams,
    });

    this.selectedMovieId = id;

    return await response.data;
  }

  async fetchSearchedMovie(id) {
    const response = await axios.get(
      `${this.baseUrl}search/movie/?api_key=${this.#API_KEY}&query=${id}`
    );

    return await response.data;
  }

  async fetchQueueMovies(ids) {
    // 1. Create Promises array
    const arrayOfPromises = ids.map(async id => {
      return await axios.get(`${this.baseUrl}movie/${id}`, {
        params: this.axiosParams,
      });
    });

    // 2. Run all Promises paralel and wait their executing
    const movies = await Promise.all(arrayOfPromises);
    console.log('SServ', movies);

    return movies;
  }
}
