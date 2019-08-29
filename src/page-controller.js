import FiltersBlock from './components/filters-block';
import Filter from './components/filter';
import FilmsBoard from './components/films-board';
import FilmsList from './components/films-list';
import Film from './components/film';
import FilmDetailed from './components/film-detailed';
import ShowMoreButton from './components/show-more-button';
import Statistic from './components/statistic';
import UserRank from './components/user-rank';


const MAX_FILMS_ON_ROW = 5;

export default class PageController {
  constructor(container, header, footer, films) {
    this._container = container;
    this._header = header;
    this._footer = footer;
    this._films = films;

    this._currentFilms = this._films;
    this._watchedFilms = this._films.filter((film) => film.isWatched);
    this._watchlistFilms = this._films.filter((film) => film.isAdded);
    this._favoriteFilms = this._films.filter((film) => film.isFavorite);

    this._userRank = new UserRank(this._watchedFilms);
    this._filtersBlock = new FiltersBlock();
    this._filmsBoard = new FilmsBoard();
    this._statistic = new Statistic(this._watchedFilms);
    this._filmsList = new FilmsList(this._films, `All movies. Upcoming`);
    this._topRatedFilmsList = new FilmsList(this._films, `Top rated`, true);
    this._mostCommentedFilmsList = new FilmsList(this._films, `Most commented`, true);
    this._showMoreButton = new ShowMoreButton(this._films);

    this._currentFilmsCountOnBoard = 0;
    this._currentFilter = `all`;

    this._filters = [
      {name: `all`, title: `All movies`, isActive: true},
      {name: `watchlist`, title: `Watchlist`, count: this._watchlistFilms.length},
      {name: `history`, title: `History`, count: this._watchedFilms.length},
      {name: `favorites`, title: `Favorites`, count: this._favoriteFilms.length},
      {name: `stats`, title: `Stats`}
    ];

    this._filmLoadMap = {
      all: this._films,
      watchlist: this._watchlistFilms,
      history: this._watchedFilms,
      favorites: this._favoriteFilms
    };

    this._filmComparatorMap = {
      rating(a, b) {
        return b.rating - a.rating;
      },
      comments(a, b) {
        return b.comments.length - a.comments.length;
      }
    };
  }

  renderElement(container, element, position = `beforeend`) {
    container.insertAdjacentElement(position, element);
  }

  init() {
    // Show more button
    const onShowMoreButtonClick = () => {
      this._currentFilmsCountOnBoard = this._filmsList.element.querySelectorAll(`.film-card`).length;

      for (const film of this._filmLoadMap[this._currentFilter].slice(this._currentFilmsCountOnBoard, this._currentFilmsCountOnBoard + MAX_FILMS_ON_ROW)) {
        this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
      }

      if (this._filmsList.element.querySelectorAll(`.film-card`).length === this._currentFilms.length) {
        this._showMoreButton.element.classList.add(`visually-hidden`);
      }
    };

    this._showMoreButton.element.addEventListener(`click`, onShowMoreButtonClick);

    // Containers & elements
    this.renderElement(this._header, this._userRank.element);
    this.renderElement(this._container, this._filtersBlock.element, `afterbegin`);
    this.renderElement(this._container, this._filmsBoard.element);
    this.renderElement(this._container, this._statistic.element);
    this.renderElement(this._filmsBoard.element, this._filmsList.element);
    this.renderElement(this._filmsBoard.element, this._topRatedFilmsList.element);
    this.renderElement(this._filmsBoard.element, this._mostCommentedFilmsList.element);

    this.renderElement(this._filmsList.element, this._showMoreButton.element);

    // Filters
    for (const filter of this._filters) {
      this._renderFilter(filter);
    }

    // All films
    for (const film of this._films.slice(0, MAX_FILMS_ON_ROW)) {
      this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
    }

    // Extra films
    const topRatedFilms = this._sortExtraFilms(`rating`);
    const mostCommentedFilms = this._sortExtraFilms(`comments`);

    for (const film of topRatedFilms.slice(0, 2)) {
      this._renderFilm(film, this._topRatedFilmsList.element.querySelector(`.films-list__container`));
    }

    for (const film of mostCommentedFilms.slice(0, 2)) {
      this._renderFilm(film, this._mostCommentedFilmsList.element.querySelector(`.films-list__container`));
    }
  }

  _clearFiltersActiveState() {
    for (const filter of this._filtersBlock.element.querySelectorAll(`.main-navigation__item`)) {
      filter.classList.remove(`main-navigation__item--active`);
    }
  }

  _renderFilter({name, title, isActive = false, count = 0}) {
    const filter = new Filter(name, title, isActive, count);

    const onFilterClick = () => {
      this._clearFiltersActiveState();
      filter.element.classList.add(`main-navigation__item--active`);

      this._filmsBoard.element.classList.remove(`visually-hidden`);
      this._statistic.element.classList.add(`visually-hidden`);

      switch (filter.element.getAttribute(`href`).replace(`#`, ``)) {
        case `all`:
          this._filmsList.element.querySelector(`.films-list__container`).innerHTML = ``;
          for (const film of this._films.slice(0, MAX_FILMS_ON_ROW)) {
            this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
          }

          this._currentFilms = this._films;
          this._currentFilter = `all`;
          this._currentFilmsCountOnBoard = this._films.slice(0, MAX_FILMS_ON_ROW).length;
          break;
        case `watchlist`:
          this._filmsList.element.querySelector(`.films-list__container`).innerHTML = ``;
          for (const film of this._watchlistFilms.slice(0, MAX_FILMS_ON_ROW)) {
            this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
          }
          this._currentFilms = this._watchlistFilms;
          this._currentFilter = `watchlist`;
          this._currentFilmsCountOnBoard = this._watchlistFilms.slice(0, MAX_FILMS_ON_ROW).length;
          break;
        case `history`:
          this._filmsList.element.querySelector(`.films-list__container`).innerHTML = ``;
          for (const film of this._watchedFilms.slice(0, MAX_FILMS_ON_ROW)) {
            this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
          }
          this._currentFilms = this._watchedFilms;
          this._currentFilter = `history`;
          this._currentFilmsCountOnBoard = this._watchedFilms.slice(0, MAX_FILMS_ON_ROW).length;
          break;
        case `favorites`:
          this._filmsList.element.querySelector(`.films-list__container`).innerHTML = ``;

          for (const film of this._favoriteFilms.slice(0, MAX_FILMS_ON_ROW)) {
            this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
          }
          this._currentFilms = this._favoriteFilms;
          this._currentFilter = `favorites`;
          this._currentFilmsCountOnBoard = this._favoriteFilms.slice(0, MAX_FILMS_ON_ROW).length;
          break;
        case `stats`:
          this._filmsBoard.element.classList.add(`visually-hidden`);
          this._statistic.element.classList.remove(`visually-hidden`);
          break;
      }

      this._showMoreButton.element.classList.add(`visually-hidden`);

      if (this._currentFilmsCountOnBoard < this._currentFilms.length) {
        this._showMoreButton.element.classList.remove(`visually-hidden`);
      }
    };

    filter.element.addEventListener(`click`, onFilterClick);
    filter.renderElement(this._filtersBlock.element);
  }

  _renderFilm(filmMock, container) {
    const film = new Film(filmMock);
    const filmDetailed = new FilmDetailed(filmMock);

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

    const onFilmElementClick = () => {
      document.addEventListener(`keydown`, onEscButtonClick);

      filmDetailed.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);

      filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscButtonClick);
      });

      filmDetailed.element.querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscButtonClick);
      });

      filmDetailed.renderElement(this._footer, `afterend`);
    };


    film.element.querySelector(`.film-card__poster`).addEventListener(`click`, onFilmElementClick);
    film.element.querySelector(`.film-card__title`).addEventListener(`click`, onFilmElementClick);
    film.element.querySelector(`.film-card__comments`).addEventListener(`click`, onFilmElementClick);

    film.renderElement(container);
  }

  _sortExtraFilms(by) {
    const filmsCopy = [...this._films];
    return filmsCopy.sort(this._filmComparatorMap[by]);
  }
}
