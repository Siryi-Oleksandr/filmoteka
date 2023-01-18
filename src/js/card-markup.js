export function createMarkupFilmsList(moviesData) {
  return moviesData
    .map(movie => {
      const { genres, id, imgUrl, name, rating, year } = movie;
      const genresToShow = trimGenresList(genres);

      return `<li class="films__item">
        <a href="" class="films__link">
          <div class="films__img-wrapper">
            <img
              src="${imgUrl}"
              alt="${name}"
              class="films__img" loading="lazy"
            />
          </div>
          <div class="films__info">
            <p class="films__name">${name}</p>
            <p class="films__desk">
              <span class="films__genre">${genresToShow}</span> |
              <span class="films__year">${year}</span>
            </p>
            <p class="films__desk">
              <span class="films__rating--text"> Rating: </span>
              <span class="films__rating">${rating}</span>
            </p>
          </div>
        </a>
      </li>`;
    })
    .join('');
}

//  function render to main page first 3 genres
function trimGenresList(genres) {
  if (genres.length <= 3) {
    return genres.join(', ');
  } else {
    return `${genres[0]}, ${genres[1]}, Other`;
  }
}
