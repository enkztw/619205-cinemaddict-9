import BaseComponent from './base-component';
import NoFilms from './no-films';
import FilmsListContainer from './films-list-container';

export default class FilmsList extends BaseComponent {
  constructor(films, name, isExtra = false) {
    super();
    this._name = name;
    this._isExtra = isExtra;
    this._films = films;
  }

  get template() {
    if (this._isExtra && !this._films.length) {
      return ``;
    }

    return `<section class="films-list${this._isExtra ? `--extra` : ``}" data-name="${this._name}">
    <h2 class="films-list__title ${!this._isExtra ? `visually-hidden` : ``}">${this._name}</h2>
    ${this._films.length ? new FilmsListContainer().template : new NoFilms().template}
    </section>`.trim();
  }
}
