export function createMarkupFilmsList(images) {
  // "x" - просто заглушка
  return images
    .map(
      x => `<li class="films__item">
        <a href="${x}" class="films__link">
          <div class="films__img-wrapper">
            <img
              src="${x}"
              alt="${x}"
              class="films__img" loading="lazy"
            />
          </div>
          <div class="films__info">
            <p class="films__name">${x}</p>
            <p class="films__desk">
              <span class="films__genre">${x}</span> |
              <span class="films__year">${x}</span>
            </p>
            <p class="films__desk">
              <span class="films__rating--text"> Rating: </span>
              <span class="films__rating">${x}</span>
            </p>
          </div>
        </a>
      </li>`
    )
    .join('');
}
