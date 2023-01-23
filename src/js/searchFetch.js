import axios from 'axios';

// const API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';
// const baseUrl = `https://api.themoviedb.org/3/`;

export const baseImgUrl = `https://image.tmdb.org/t/p/`;
export const imgPosterSize = `w500`;

export class SearchMoviesAPI {
  #API_KEY;
  constructor() {
    this.#API_KEY = 'd03712107dcdd723f1173c5ee2c0d8c1';
    this.baseUrl = `https://api.themoviedb.org/3/`;
    this.axiosParams = {
      api_key: this.#API_KEY,
    };
  }

  async fetchSearchedMovie(query) {
    const response = await axios.get(
      `${this.baseUrl}search/movie/?query=${query}`,
      this.axiosParams
    );

    return await response;
  }
}

// async fetchSearchedMovie(searchMovie) {
//     const response = await axios.get(
//       `${this.baseUrl}search/movie/?api_key=${
//         this.#API_KEY
//       }&query=${searchMovie}`
//     );

//     return response.data;
//   }
