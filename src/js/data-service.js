import { MoviesApiServise, baseImgUrl, imgPosterSize } from './search-servise';
import { GenresService } from './genres-service';

const genresService = new GenresService();

export class DataService {
  getDataTrendMovies(results, allGenres) {
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

  getDataSelectedMovie(data) {
    const {
      poster_path,
      genres,
      vote_average,
      vote_count,
      popularity,
      title,
      original_title,
      overview,
      release_date,
    } = data;

    const imgUrl = baseImgUrl + imgPosterSize + poster_path;

    return {
      imgUrl: imgUrl,
      name: title,
      vote: vote_average.toFixed(1),
      votes: vote_count,
      popularity: popularity,
      originalTitle: original_title,
      genres: genresService.getSelectedMovieGenres(genres),
      about: overview,
      year: Number.parseInt(release_date),
    };
  }

  //   getDataLibraryMovie(data) {
  //     console.log('data', data);

  //     return data.map(
  //       ({
  //         poster_path,
  //         genres,
  //         vote_average,
  //         vote_count,
  //         popularity,
  //         title,
  //         original_title,
  //         overview,
  //         id,
  //       }) => {
  //         const imgUrl = baseImgUrl + imgPosterSize + poster_path;

  //         return {
  //           imgUrl: imgUrl,
  //           genres: genresService.getSelectedMovieGenres(genres),
  //           rating: vote_average.toFixed(1),
  //           name: title,
  //           id: id,
  //           year: Number.parseInt(release_date),
  //         };
  //       }
  //     );
  //   }
}
