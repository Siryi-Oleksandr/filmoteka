export function createMarkupFilmsList(moviesData) {
  return moviesData
    .map(movie => {
      const { genres, id, imgUrl, name, rating, year } = movie;
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
              <span class="films__genre">${genres}</span> |
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
