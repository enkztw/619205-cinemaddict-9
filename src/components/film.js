import BaseComponent from './base-component';
import {controls} from '../films';

const generateFilmControlTemplate = ({name, description}, isActive) => `<button class="film-card__controls-item button film-card__controls-item--${description} ${isActive ? `film-card__controls-item--active` : ``}">Add to ${name}</button>`;

const generateFilmControlsTemplate = (items, isActive) => items.map((item, index) => generateFilmControlTemplate(item, isActive[index])).join(``);

const generateFilmControlsBlockTemplate = (items, isActive) => {
  const filmControlsBlockTemplate =
  `<form class="film-card__controls">
  ${generateFilmControlsTemplate(items, isActive)}
  </form>`.trim();

  return filmControlsBlockTemplate;
};

export default class Film extends BaseComponent {
  constructor(film) {
    super();
    this._id = film.id;
    this._name = film.name;
    this._poster = film.poster;
    this._rating = film.rating;
    this._date = film.date;
    this._duration = film.duration;
    this._genres = film.genres;
    this._description = film.description;
    this._comments = film.comments;
    this._isAdded = film.isAdded;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;
  }

  get template() {
    return `<article class="film-card" data-id="${this._id}">
    <h3 class="film-card__title">${this._name}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._date.getFullYear()}</span>
      <span class="film-card__duration">${Math.floor(this._duration / 60)}h ${this._duration % 60}m</span>
      <span class="film-card__genre">${Array.from(this._genres)[0]}</span>
    </p>
    <img src="./images/posters/${this._poster}" alt="${this._name}" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <a class="film-card__comments">${this._comments.length} comments</a>
    ${generateFilmControlsBlockTemplate(controls, [this._isAdded, this._isWatched, this._isFavorite])}
  </article>`.trim();
  }
}

export {Film};
