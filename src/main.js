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
import {generateFilmCardsTemplate} from './components/film-card';
import {generateFilmListTemplate} from './components/films-list';
import {generateFilmCardDetailsTemplate} from './components/film-card-details';

const MAX_FILMS_ON_BOARD = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const statistics = footer.querySelector(`.footer__statistics p`);

const watchedFilms = films.filter((film) => film.isWatched);
const watchlistFilms = films.filter((film) => film.isAdded);
const favoriteFilms = films.filter((film) => film.isFavorite);

// Search
renderComponent(generateSearchTemplate(), header);

// User rank
const userRank = getUserRank(watchedFilms);
user.rank = userRank;
renderComponent(generateUserRankTemplate(user), header);

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
renderComponent(generateFilmListTemplate(films.slice(0, MAX_FILMS_ON_BOARD)), filmsContainer);

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
renderComponent(generateFilmListTemplate(topRatedFilms.slice(0, 2), `Top rated`, true), filmsContainer);

// Most commented
const mostCommentedFilms = sortFilms(`comments`);
renderComponent(generateFilmListTemplate(mostCommentedFilms.slice(0, 2), `Most commented`, true), filmsContainer);


// Events to watch detailed info
const filmCards = document.querySelectorAll(`.film-card .film-card__poster`);

const onFilmCardClick = (evt) => {
  const id = parseInt(evt.target.closest(`article`).getAttribute(`data-id`), 10);
  const film = films.find((item) => item.id === id);
  renderComponent(generateFilmCardDetailsTemplate(film), footer, `afterend`);
};

for (const filmCard of filmCards) {
  filmCard.addEventListener(`click`, onFilmCardClick);
}

// Event to show more films
const filmsList = document.querySelector(`.films-list .films-list__container`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

let currentFilmsOnBoard = MAX_FILMS_ON_BOARD;

const onShowMoreButtonClick = () => {
  renderComponent(generateFilmCardsTemplate(films.slice(currentFilmsOnBoard, currentFilmsOnBoard + MAX_FILMS_ON_BOARD)), filmsList);
  currentFilmsOnBoard += MAX_FILMS_ON_BOARD;

  if (currentFilmsOnBoard >= films.length) {
    showMoreButton.remove();
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

// Global event for navigations
const navigationButtons = document.querySelectorAll(`.main-navigation__item`);

const clearNaviationsActiveState = () => {
  for (const navigationButton of navigationButtons) {
    navigationButton.classList.remove(`main-navigation__item--active`);
  }
};

const toggleSections = () => {
  statisticSection.classList.add(`visually-hidden`);
  filmsSection.classList.remove(`visually-hidden`);
};

const renderFilmsByNavigation = (filteredFilms) => {
  filmsList.innerHTML = ``;
  renderComponent(generateFilmCardsTemplate(filteredFilms), filmsList);
  toggleSections();
};

const onNavigationClick = (evt) => {
  const navigationButton = evt.target;

  clearNaviationsActiveState();
  navigationButton.classList.add(`main-navigation__item--active`);

  switch (navigationButton.getAttribute(`href`).replace(`#`, ``)) {
    case `all`:
      renderFilmsByNavigation(films.slice(0, MAX_FILMS_ON_BOARD));
      break;
    case `watchlist`:
      renderFilmsByNavigation(watchlistFilms);
      break;
    case `history`:
      renderFilmsByNavigation(watchedFilms);
      break;
    case `favorites`:
      renderFilmsByNavigation(favoriteFilms);
      break;
  }
};

for (const navigationButton of navigationButtons) {
  navigationButton.addEventListener(`click`, onNavigationClick);
}

// Calculating movies inside
statistics.textContent = `${films.length} movies inside`;
