import BaseComponent from './base-component';

export default class NoFilms extends BaseComponent {
  get template() {
    return `<div class="no-result">There are no movies in our database.</div>`;
  }
}
