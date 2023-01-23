// Search reason functionality
// refs.searchForm.addEventListener('input', debounce(onSearchInput, 300));
// refs.searchForm.addEventListener('submit', onSearchSubmit);

// function onSearchSubmit(event) {
//   event.preventDefault();

//   // const value = event.currentTarget.elements.query.value;
//   const value = event.target.value;

//   console.dir(value);

//   if (!value) {
//     movieServise
//       .fetchTrendMovies()
//       .then(handleTrendMovies)
//       .catch(handleError)
//       .finally(() => {
//         // here should be spinner.close
//       });
//   }

//   movieServise
//     .fetchSearchedMovie(value)
//     .then(data => console.log(data))
//     .catch(handleError)
//     .finally(() => {
//       // here should be spinner.close
//     });

// return movieServise
//   .fetchSearchedMovie(value)
//   .then(({ results }) => {
//     const data = searchHandle(results);
//     const markup = createMarkupSearchedList(data);
//     refs.moviesList.innerHTML = markup;
//   })
//   .catch(handleError)
//   .finally(() => {
//     // here should be spinner.close
//   });
// }

// function searchHandle(data) {
//   return data.map(
//     ({ poster_path, genre_ids, vote_average, title, id, release_date }) => {
//       const imgUrl = baseImgUrl + imgPosterSize + poster_path;
//       const genres = trimGenresList(genre_ids);

//       return {
//         imgUrl: imgUrl,
//         genres: genres,
//         rating: vote_average.toFixed(1),
//         name: title,
//         id: id,
//         year: Number.parseInt(release_date),
//       };
//     }
//   );
// }
