import { refs } from './refs';
import { Spinner } from 'spin.js';

const opts = {
  lines: 13, // The number of lines to draw
  length: 51, // The length of each line
  width: 10, // The line thickness
  radius: 47, // The radius of the inner circle
  scale: 1.1, // Scales overall size of the spinner
  corners: 0.6, // Corner roundness (0..1)
  speed: 1.4, // Rounds per second
  rotate: 3, // The rotation offset
  animation: 'spinner-line-fade-default', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#b97322', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinner = new Spinner(opts);

export function spinnerPlay() {
  spinner.spin(refs.spinner);
  refs.backdropSpinner.classList.remove('is-hidden');
}

export function spinnerStop() {
  spinner.stop();
  refs.backdropSpinner.classList.add('is-hidden');
}
