import { refs } from './refs';

export class ModalServise {
  // constructor() {}

  openModal() {
    refs.modal.classList.remove('is-hidden');

    refs.modal.addEventListener('click', this.closeModal);
    refs.closeModalBtn.addEventListener('click', this.closeModal);
    window.addEventListener('keydown', this.closeModal);
  }

  closeModal(evt) {
    const isBtnClose = evt.currentTarget.name === 'btn-close';
    const isBackdrop = evt.currentTarget === evt.target;
    const isEscKey = evt.code === 'Escape';
    if (isBackdrop || isBtnClose || isEscKey) {
      refs.modal.classList.add('is-hidden');

      // remove listeners
      refs.closeModalBtn.removeEventListener('click', this.closeModal);
      refs.modal.removeEventListener('click', this.closeModal);
      window.removeEventListener('keydown', this.closeModal);
    }
  }
}
