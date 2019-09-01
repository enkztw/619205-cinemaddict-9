import Film from '../components/film';
import FilmDetailed from '../components/film-detailed';

export default class FilmController {
  constructor(container, footer, data, onDataChange, onChangeView) {
    this._container = container;
    this._footer = footer;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._filmStatusMap = {
      watched: `isWatched`,
      watchlist: `isAdded`,
      favorite: `isFavorite`
    };

    this.init();
  }

  init() {
    const film = new Film(this._data);
    const filmDetailed = new FilmDetailed(this._data);

    const onCloseButtonClick = () => {
      filmDetailed.removeElement();
      document.removeEventListener(`keydown`, onEscButtonClick);
    };

    const onEscButtonClick = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        filmDetailed.removeElement();
        document.removeEventListener(`keydown`, onEscButtonClick);
      }
    };

    const onScoreChange = (evt) => {
      const checkedControls = Array.from(filmDetailed.element.querySelectorAll(`.film-details__control-input:checked`)).map((item) => item.getAttribute(`name`));
      const newData = checkedControls.reduce((acc, curr) => {
        acc[this._filmStatusMap[curr]] = true;

        return acc;
      }, {
        id: this._data.id,
        name: this._data.name,
        poster: this._data.poster,
        rating: this._data.rating,
        date: this._data.date,
        duration: this._data.duration,
        genres: this._data.genres,
        description: this._data.description,
        comments: this._data.comments,
        isAdded: false,
        isWatched: false,
        isFavorite: false,
        userScore: evt.target.value,
        director: this._data.director,
        writers: this._data.writers,
        actors: this._data.actors,
        country: this._data.country
      });

      this._onDataChange(newData, this._data);
    };

    const onDetailedControlClick = (evt) => {
      if (evt.target.getAttribute(`name`) === `watched` && filmDetailed.element.querySelector(`.form-details__middle-container`)) {
        for (const scoreButton of filmDetailed.element.querySelectorAll(`.film-details__user-rating-input`)) {
          scoreButton.addEventListener(`change`, onScoreChange);
        }
      }

      const checkedControls = Array.from(filmDetailed.element.querySelectorAll(`.film-details__control-input:checked`)).map((item) => item.getAttribute(`name`));
      const newData = checkedControls.reduce((acc, curr) => {
        acc[this._filmStatusMap[curr]] = true;

        return acc;
      }, {
        id: this._data.id,
        name: this._data.name,
        poster: this._data.poster,
        rating: this._data.rating,
        date: this._data.date,
        duration: this._data.duration,
        genres: this._data.genres,
        description: this._data.description,
        comments: this._data.comments,
        isAdded: false,
        isWatched: false,
        isFavorite: false,
        userScore: filmDetailed.element.querySelector(`.film-details__user-rating-input:checked`),
        director: this._data.director,
        writers: this._data.writers,
        actors: this._data.actors,
        country: this._data.country
      });

      if (!checkedControls.includes(`watched`)) {
        newData.userScore = null;
      }

      this._onDataChange(newData, this._data);
    };

    const onFilmElementClick = () => {
      document.addEventListener(`keydown`, onEscButtonClick);

      // Close element
      filmDetailed.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);

      // Comment field
      filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscButtonClick);
      });

      filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscButtonClick);
      });

      // Control elements
      for (const control of filmDetailed.element.querySelectorAll(`.film-details__control-input`)) {
        control.addEventListener(`change`, onDetailedControlClick);
      }

      // Score elements
      if (filmDetailed.element.querySelector(`.form-details__middle-container`)) {
        for (const scoreButton of filmDetailed.element.querySelectorAll(`.film-details__user-rating-input`)) {
          scoreButton.addEventListener(`change`, onScoreChange);
        }
      }

      filmDetailed.renderElement(this._footer, `afterend`);
    };

    const onControlClick = (evt) => {
      const checkedControls = Array.from(evt.target.querySelectorAll(`.film-card__controls-item--active`)).map((control) => control.getAttribute(`data-name`));

      const newData = checkedControls.reduce((acc, curr) => {
        acc[this._filmStatusMap[curr]] = true;

        return acc;
      }, {
        id: this._data.id,
        name: this._data.name,
        poster: this._data.poster,
        rating: this._data.rating,
        date: this._data.date,
        duration: this._data.duration,
        genres: this._data.genres,
        description: this._data.description,
        comments: this._data.comments,
        isAdded: false,
        isWatched: false,
        isFavorite: false,
        userScore: this._data.userScore,
        director: this._data.director,
        writers: this._data.writers,
        actors: this._data.actors,
        country: this._data.country
      });

      this._onDataChange(newData, this._data);
    };


    film.element.querySelector(`.film-card__poster`).addEventListener(`click`, onFilmElementClick);
    film.element.querySelector(`.film-card__title`).addEventListener(`click`, onFilmElementClick);
    film.element.querySelector(`.film-card__comments`).addEventListener(`click`, onFilmElementClick);
    film.element.querySelector(`.film-card__controls`).addEventListener(`submit`, onControlClick);

    film.renderElement(this._container);
  }
}
