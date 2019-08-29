import {renderContainer} from './dom-utils';
import {renderComponent} from './dom-utils';

import {generateSearchTemplate} from './components/search';

import {user} from './components/user-rank';
import {getUserRank} from './components/user-rank';
import {generateUserRankTemplate} from './components/user-rank';

import {filters} from './components/filters';
import {getFilter} from './components/filters';
import {setFilterCount} from './components/filters';
import {generateFiltersBlockTemplate} from './components/filters';

import {sorts} from './components/sort';
import {generateSortTemplate} from './components/sort';

import {generateStatisticTemplate} from './components/statistic';

import {films} from './data';
import {generateFilmListTemplate} from './components/films-list';

import Film from './components/film';
import FilmDetailed from './components/film-detailed';

const MAX_FILMS_ON_ROW = 5;
let currentFilmsCountOnBoard = 0;
let currentFilms = films;
let currentFilter = `all`;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const statistics = footer.querySelector(`.footer__statistics p`);

const watchedFilms = films.filter((film) => film.isWatched);
const watchlistFilms = films.filter((film) => film.isAdded);
const favoriteFilms = films.filter((film) => film.isFavorite);

const renderFilm = (filmMock, container) => {
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

    filmDetailed.renderElement(footer, `afterend`);
  };


  film.element.querySelector(`.film-card__poster`).addEventListener(`click`, onFilmElementClick);
  film.element.querySelector(`.film-card__title`).addEventListener(`click`, onFilmElementClick);
  film.element.querySelector(`.film-card__comments`).addEventListener(`click`, onFilmElementClick);

  film.renderElement(container);
};

// Search
renderComponent(generateSearchTemplate(), header);

// User rank
const userRank = getUserRank(watchedFilms);
user.rank = userRank;
if (watchedFilms.length > 0) {
  renderComponent(generateUserRankTemplate(user), header);
}


// Menu
const history = getFilter(`history`);
setFilterCount(history, watchedFilms.length);

const watchlist = getFilter(`watchlist`);
setFilterCount(watchlist, watchlistFilms.length);

const favorites = getFilter(`favorites`);
setFilterCount(favorites, favoriteFilms.length);

renderComponent(generateFiltersBlockTemplate(filters), main);
renderComponent(generateSortTemplate(sorts), main);

// Statistic
renderComponent(generateStatisticTemplate(userRank, user.avatar, watchedFilms), main);

// All films
const filmsContainer = renderContainer(`section`, [`films`], main);
renderComponent(generateFilmListTemplate(), filmsContainer);
const allFilmsListContainer = filmsContainer.querySelector(`[data-name="All movies. Upcoming"]`);
for (const film of films.slice(0, MAX_FILMS_ON_ROW)) {
  renderFilm(film, allFilmsListContainer.querySelector(`.films-list__container`));
}

// Extra films
const filmComparatorMap = {
  rating(a, b) {
    return b.rating - a.rating;
  },
  comments(a, b) {
    return b.comments.length - a.comments.length;
  }
};

const sortFilms = (by) => {
  const filmsCopy = [...films];
  return filmsCopy.sort(filmComparatorMap[by]);
};

// Top rated
const topRatedFilms = sortFilms(`rating`);
renderComponent(generateFilmListTemplate(`Top rated`, true), filmsContainer);
const topRatedFilmsListContainer = filmsContainer.querySelector(`[data-name="Top rated"]`);
for (const film of topRatedFilms.slice(0, 2)) {
  renderFilm(film, topRatedFilmsListContainer.querySelector(`.films-list__container`));
}

// Most commented
const mostCommentedFilms = sortFilms(`comments`);
renderComponent(generateFilmListTemplate(`Most commented`, true), filmsContainer);
const mostCommentedFilmsListContainer = filmsContainer.querySelector(`[data-name="Most commented"]`);
for (const film of mostCommentedFilms.slice(0, 2)) {
  renderFilm(film, mostCommentedFilmsListContainer.querySelector(`.films-list__container`));
}

// Event to show more films
const filmsList = document.querySelector(`.films-list .films-list__container`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

const filmLoadMap = {
  all: films,
  watchlist: watchlistFilms,
  history: watchedFilms,
  favorites: favoriteFilms
};

const onShowMoreButtonClick = () => {
  currentFilmsCountOnBoard = filmsList.querySelectorAll(`.film-card`).length;

  for (const film of filmLoadMap[currentFilter].slice(currentFilmsCountOnBoard, currentFilmsCountOnBoard + MAX_FILMS_ON_ROW)) {
    renderFilm(film, allFilmsListContainer.querySelector(`.films-list__container`));
  }

  if (filmsList.querySelectorAll(`.film-card`).length === currentFilms.length) {
    showMoreButton.classList.add(`visually-hidden`);
  }
};

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

// Event to toggle statistic
const filmsSection = main.querySelector(`.films`);
const statisticSection = main.querySelector(`.statistic`);

const statsButton = main.querySelector(`a[href="#stats"]`);
const onStatsButtonClick = () => {
  filmsSection.classList.add(`visually-hidden`);
  statisticSection.classList.remove(`visually-hidden`);
};

statsButton.addEventListener(`click`, onStatsButtonClick);

// Global event for filters
const filtersButtons = document.querySelectorAll(`.main-navigation__item`);

const clearFiltersActiveState = () => {
  for (const filterButton of filtersButtons) {
    filterButton.classList.remove(`main-navigation__item--active`);
  }
};

const toggleSections = () => {
  statisticSection.classList.add(`visually-hidden`);
  filmsSection.classList.remove(`visually-hidden`);
};

const renderFilmsByFilter = (filteredFilms) => {
  filmsList.innerHTML = ``;
  for (const film of filteredFilms) {
    renderFilm(film, allFilmsListContainer.querySelector(`.films-list__container`));
  }

  currentFilmsCountOnBoard = filteredFilms.length;
  toggleSections();
};

const onFilterClick = (button) => {

  clearFiltersActiveState();
  button.classList.add(`main-navigation__item--active`);

  if (films.length === 0) {
    return;
  }

  switch (button.getAttribute(`href`).replace(`#`, ``)) {
    case `all`:
      renderFilmsByFilter(films.slice(0, MAX_FILMS_ON_ROW));
      currentFilms = films;
      currentFilter = `all`;
      break;
    case `watchlist`:
      renderFilmsByFilter(watchlistFilms.slice(0, MAX_FILMS_ON_ROW));
      currentFilms = watchlistFilms;
      currentFilter = `watchlist`;
      break;
    case `history`:
      renderFilmsByFilter(watchedFilms.slice(0, MAX_FILMS_ON_ROW));
      currentFilms = watchedFilms;
      currentFilter = `history`;
      break;
    case `favorites`:
      renderFilmsByFilter(favoriteFilms.slice(0, MAX_FILMS_ON_ROW));
      currentFilms = favoriteFilms;
      currentFilter = `favorites`;
      break;
  }

  showMoreButton.classList.add(`visually-hidden`);

  if (currentFilmsCountOnBoard < currentFilms.length) {
    showMoreButton.classList.remove(`visually-hidden`);
  }
};

for (const filterButton of filtersButtons) {
  filterButton.addEventListener(`click`, (evt) => {
    onFilterClick(evt.target.closest(`.main-navigation__item`));
  });
}

// Calculating movies inside
statistics.textContent = `${films.length} movies inside`;
