export class GenresService {
  getTrendMovieGenres(genreIds, allGenres) {
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

  getSelectedMovieGenres(arr) {
    return arr.map(el => el.name).join(', ');
  }
}
