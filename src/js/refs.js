export const refs = {
  moviesList: document.querySelector('.js-films-list'),

  // Modal elements
  modalContainer: document.querySelector('.js-modal-container'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'), // backdrop
  btnAddToQueue: document.querySelector('[data-add-to-queue]'),
  btnAddToWatched: document.querySelector('[data-add-to-watched]'),

  // Search input in Header
  searchForm: document.querySelector('.header__form'),

  // Library page
  libraryList: document.querySelector('.js-library-list'),
  btnQueue: document.querySelector('.js-btn-queue'),
  btnWatched: document.querySelector('.js-btn-watched'),
};
