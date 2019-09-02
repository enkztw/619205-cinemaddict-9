import Film from '../components/film';
import FilmDetailed from '../components/film-detailed';

export default class FilmController {
  constructor(container, footer, data, onDataChange, onChangeView) {
    this._container = container;
    this._footer = footer;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._film = new Film(this._data);
    this._filmDetailed = new FilmDetailed(this._data);

    this._filmStatusMap = {
      watched: `isWatched`,
      watchlist: `isAdded`,
      favorite: `isFavorite`
    };

    this._isCtrlPressed = false;

    this.init();
  }

  init() {
    const onCloseButtonClick = () => {
      this._filmDetailed.removeElement();
      document.removeEventListener(`keydown`, onEscButtonClick);
    };

    const onEscButtonClick = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._filmDetailed.removeElement();
        document.removeEventListener(`keydown`, onEscButtonClick);
      }
    };

    const onScoreReset = () => {
      const newData = this.collectData(this._filmDetailed.element);


      this._onDataChange(newData, this._data);
    };

    const onScoreChange = () => {
      const newData = this.collectData(this._filmDetailed.element);

      this._onDataChange(newData, this._data);
    };

    const onDetailedControlClick = (evt) => {
      if (evt.target.getAttribute(`name`) === `watched` && this._filmDetailed.element.querySelector(`.form-details__middle-container`)) {
        for (const scoreButton of this._filmDetailed.element.querySelectorAll(`.film-details__user-rating-input`)) {
          scoreButton.addEventListener(`change`, onScoreChange);
        }

        this._filmDetailed.element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, onScoreReset);
      }

      const newData = this.collectData(this._filmDetailed.element);

      this._onDataChange(newData, this._data);
    };

    const onCtrlPressed = (evt) => {
      if (evt.key === `Meta`) {
        this._isCtrlPressed = true;
      }

      if (this._isCtrlPressed && evt.key === `Enter` && this._filmDetailed.element.querySelector(`.film-details__add-emoji-label`).querySelector(`img`)) {
        const newData = this.collectData(this._filmDetailed.element);

        this._onDataChange(newData, this._data);
      }
    };

    const onCtrlUnpressed = (evt) => {
      if (evt.key === `Meta`) {
        this._isCtrlPressed = false;
      }
    };

    const onCommentDelete = () => {
      const newData = this.collectData(this._filmDetailed.element);

      this._onDataChange(newData, this._data);
    };

    const onFilmElementClick = () => {
      this._onChangeView();
      this._filmDetailed.addEventListeners();
      document.addEventListener(`keydown`, onEscButtonClick);

      // Close element
      this._filmDetailed.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);

      // Comment field
      this._filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscButtonClick);
      });

      this._filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscButtonClick);
      });

      // Control elements
      for (const control of this._filmDetailed.element.querySelectorAll(`.film-details__control-input`)) {
        control.addEventListener(`change`, onDetailedControlClick);
      }

      // Score elements
      if (this._filmDetailed.element.querySelector(`.form-details__middle-container`)) {
        for (const scoreButton of this._filmDetailed.element.querySelectorAll(`.film-details__user-rating-input`)) {
          scoreButton.addEventListener(`change`, onScoreChange);
        }

        this._filmDetailed.element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, onScoreReset);
      }

      // Comment field element
      this._filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        this._isCtrlPressed = false;
        this._filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, onCtrlPressed);
        this._filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`keyup`, onCtrlUnpressed);
      });

      this._filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        this._isCtrlPressed = false;
        this._filmDetailed.element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, onCtrlPressed);
        this._filmDetailed.element.querySelector(`.film-details__comment-input`).removeEventListener(`keyup`, onCtrlUnpressed);
      });

      // Comment delete buttons
      for (const deleteButton of this._filmDetailed.element.querySelectorAll(`.film-details__comment-delete`)) {
        deleteButton.addEventListener(`click`, onCommentDelete);
      }

      this._filmDetailed.renderElement(this._footer, `afterend`);
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


    this._film.element.querySelector(`.film-card__poster`).addEventListener(`click`, onFilmElementClick);
    this._film.element.querySelector(`.film-card__title`).addEventListener(`click`, onFilmElementClick);
    this._film.element.querySelector(`.film-card__comments`).addEventListener(`click`, onFilmElementClick);
    this._film.element.querySelector(`.film-card__controls`).addEventListener(`submit`, onControlClick);

    this._film.renderElement(this._container);
  }

  collectData(element) {
    const checkedControls = Array.from(element.querySelectorAll(`.film-details__control-input:checked`)).map((control) => control.getAttribute(`name`));
    const userScore = element.querySelector(`.film-details__user-rating-input:checked`) ? element.querySelector(`.film-details__user-rating-input:checked`).value : ``;
    const comments = Array.from(element.querySelectorAll(`.film-details__comment`)).map((comment) => {
      return {
        author: comment.querySelector(`.film-details__comment-author`).textContent,
        comment: comment.querySelector(`.film-details__comment-text`).textContent,
        reaction: comment.querySelector(`.film-details__comment-emoji`).querySelector(`img`).getAttribute(`data-name`),
        ago: new Date(comment.querySelector(`.film-details__comment-day`).textContent)
      };
    });
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
      comments,
      isAdded: false,
      isWatched: false,
      isFavorite: false,
      userScore,
      director: this._data.director,
      writers: this._data.writers,
      actors: this._data.actors,
      country: this._data.country
    });


    return newData;
  }

  setDefaultView() {
    if (this._container.contains(this._filmDetailed.element)) {
      this._container.replaceChild(this._film.element, this._filmDetailed.element);
    }
  }
}
