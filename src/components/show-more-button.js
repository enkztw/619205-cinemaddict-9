import BaseComponent from './base-component';

export default class ShowMoreButton extends BaseComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  get template() {
    return `<button class="films-list__show-more${this._films.length < 5 ? ` visually-hidden` : ``}">Show more</button>`;
  }
}
