import {createElement} from '../dom-utils';
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

export default class Film {
  constructor({id,
    name,
    poster,
    rating,
    date,
    duration,
    genres,
    description,
    comments,
    isAdded,
    isWatched,
    isFavorite}) {
    this._id = id;
    this._name = name;
    this._poster = poster;
    this._rating = rating;
    this._date = date;
    this._duration = duration;
    this._genres = genres;
    this._description = description;
    this._comments = comments;
    this._isAdded = isAdded;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._element = null;
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

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  renderElement(container, position = `beforeend`) {
    container.insertAdjacentElement(position, this.element);
  }

  removeElement() {
    this._element.remove();
  }
}

export {Film};
