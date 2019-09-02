import FilmController from './film-controller';
import FiltersBlock from '../components/filters-block';
import Filter from '../components/filter';
import Sort from '../components/sort';
import FilmsBoard from '../components/films-board';
import FilmsList from '../components/films-list';
import ShowMoreButton from '../components/show-more-button';
import Statistic from '../components/statistic';
import UserRank from '../components/user-rank';


const MAX_FILMS_ON_ROW = 5;

export default class PageController {
  constructor(container, header, footer, films) {
    this._container = container;
    this._header = header;
    this._footer = footer;
    this._films = films;

    this._subscribers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);

    this._currentFilms = this._films;
    this._watchedFilms = this._films.filter((film) => film.isWatched);
    this._watchlistFilms = this._films.filter((film) => film.isAdded);
    this._favoriteFilms = this._films.filter((film) => film.isFavorite);

    this._filters = [
      {name: `all`, title: `All movies`, isActive: true},
      {name: `watchlist`, title: `Watchlist`, count: this._watchlistFilms.length},
      {name: `history`, title: `History`, count: this._watchedFilms.length},
      {name: `favorites`, title: `Favorites`, count: this._favoriteFilms.length},
      {name: `stats`, title: `Stats`}
    ];

    this._sorts = [
      {name: `default`, isActive: true},
      {name: `date`, isActive: false},
      {name: `rating`, isActive: false}
    ];

    this._filmComparatorMap = {
      default(a, b) {
        return a.id - b.id;
      },
      rating(a, b) {
        return b.rating - a.rating;
      },
      comments(a, b) {
        return b.comments.length - a.comments.length;
      },
      date(a, b) {
        return b.date - a.date;
      }
    };

    this._userRank = new UserRank(this._watchedFilms);
    this._filtersBlock = new FiltersBlock();
    this._sort = new Sort(this._sorts);
    this._filmsBoard = new FilmsBoard();
    this._statistic = new Statistic(this._watchedFilms);
    this._filmsList = new FilmsList(this._films, `All movies. Upcoming`);
    this._topRatedFilmsList = new FilmsList(this._films, `Top rated`, true);
    this._mostCommentedFilmsList = new FilmsList(this._films, `Most commented`, true);
    this._showMoreButton = new ShowMoreButton(this._films);

    this._currentFilmsCountOnBoard = 0;
    this._currentFilter = `all`;

  }

  renderElement(container, element, position = `beforeend`) {
    container.insertAdjacentElement(position, element);
  }

  init() {
    // Show more button
    const onShowMoreButtonClick = () => {
      this._currentFilmsCountOnBoard = this._filmsList.element.querySelectorAll(`.film-card`).length;

      for (const film of this._currentFilms.slice(this._currentFilmsCountOnBoard, this._currentFilmsCountOnBoard + MAX_FILMS_ON_ROW)) {
        this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
      }

      if (this._filmsList.element.querySelectorAll(`.film-card`).length === this._currentFilms.length) {
        this._showMoreButton.element.classList.add(`visually-hidden`);
      }
    };

    const onSortClick = (evt) => {
      evt.preventDefault();
      const sort = evt.target;
      if (evt.target.tagName.toLowerCase() !== `a`) {
        return;
      }

      this._clearButtonsActiveState(this._sort.element.querySelectorAll(`.sort__button`), `sort__button--active`);
      sort.classList.add(`sort__button--active`);

      const sortName = sort.getAttribute(`data-name`);
      const sortedFilms = this._sortFilms(sortName);
      this._currentFilms = sortedFilms;

      this._filmsList.element.querySelector(`.films-list__container`).innerHTML = ``;

      for (const film of this._currentFilms.slice(0, MAX_FILMS_ON_ROW)) {
        this._renderFilm(film, this._filmsList.element.querySelector(`.films-list__container`));
      }

      this._showMoreButton.element.classList.remove(`visually-hidden`);

    };

    this._showMoreButton.element.addEventListener(`click`, onShowMoreButtonClick);
    this._sort.element.addEventListener(`click`, onSortClick);

    // Containers & elements
    this.renderElement(this._header, this._userRank.element);
    this.renderElement(this._container, this._filtersBlock.element, `afterbegin`);
    this.renderElement(this._container, this._sort.element);
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
    this._renderFilms(this._filmsList.element.querySelector(`.films-list__container`), this._currentFilms, MAX_FILMS_ON_ROW);

    // Extra films
    const topRatedFilms = this._sortFilms(`rating`);
    this._renderFilms(this._topRatedFilmsList.element.querySelector(`.films-list__container`), topRatedFilms, 2);

    const mostCommentedFilms = this._sortFilms(`comments`);
    this._renderFilms(this._mostCommentedFilmsList.element.querySelector(`.films-list__container`), mostCommentedFilms, 2);
  }

  _renderFilms(container, films, count) {
    container.innerHTML = ``;
    for (const film of films.slice(0, count)) {
      this._renderFilm(film, container);
    }
  }

  _onDataChange(newData, oldData) {
    const index = this._currentFilms.findIndex((film) => film.id === oldData.id);

    this._currentFilms[index] = newData;

    console.log(newData);

    // All films
    this._renderFilms(this._filmsList.element.querySelector(`.films-list__container`), this._currentFilms, this._filmsList.element.querySelector(`.films-list__container`).childNodes.length);

    // Extra films
    const topRatedFilms = this._sortFilms(`rating`);
    this._renderFilms(this._topRatedFilmsList.element.querySelector(`.films-list__container`), topRatedFilms, 2);

    const mostCommentedFilms = this._sortFilms(`comments`);
    this._renderFilms(this._mostCommentedFilmsList.element.querySelector(`.films-list__container`), mostCommentedFilms, 2);
  }

  _onChangeView() {
    for (const subscriber of this._subscribers) {
      subscriber();
    }
  }

  _clearButtonsActiveState(buttons, className) {
    for (const button of buttons) {
      button.classList.remove(className);
    }
  }

  _renderFilter({name, title, isActive = false, count = 0}) {
    const filter = new Filter(name, title, isActive, count);

    const onFilterClick = () => {
      if (!this._sort.element.querySelector(`.sort__button`).classList.contains(`.sort__button--active`)) {
        this._clearButtonsActiveState(this._sort.element.querySelectorAll(`.sort__button`), `sort__button--active`);
        this._sort.element.querySelector(`.sort__button`).classList.add(`sort__button--active`);
      }

      this._clearButtonsActiveState(this._filtersBlock.element.querySelectorAll(`.main-navigation__item`), `main-navigation__item--active`);
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

  _renderFilm(film, container) {
    const filmController = new FilmController(container, this._footer, film, this._onDataChange, this._onChangeView);

    this._subscribers.push(filmController.setDefaultView.bind(filmController));
  }

  _sortFilms(by) {
    const filmsCopy = [...this._currentFilms];
    return filmsCopy.sort(this._filmComparatorMap[by]);
  }
}
