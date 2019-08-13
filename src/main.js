import {renderContainer} from './dom-utils';
import {renderComponent} from './dom-utils';

import {generateSearchTemplate} from './components/search';

import {user} from './components/user-profile';
import {generateUserProfileTemplate} from './components/user-profile';

import {navigates} from './components/navigation';
import {generateNavigationTemplate} from './components/navigation';

import {sorts} from './components/sort';
import {generateSortTemplate} from './components/sort';

import {films} from './data';
import {generateFilmListTemplate} from './components/films-list';
import {generateFilmCardDetailsTemplate} from './components/film-card-details';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);


renderComponent(generateSearchTemplate(), header);
renderComponent(generateUserProfileTemplate(user), header);

renderComponent(generateNavigationTemplate(navigates), main);
renderComponent(generateSortTemplate(sorts), main);

// All films
const filmsContainer = renderContainer(`section`, [`films`], main);
renderComponent(generateFilmListTemplate(films), filmsContainer);

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

const renderFilmCardDetails = (evt) => {
  const filmName = evt.target.getAttribute(`alt`);
  const film = films.find((item) => item.name === filmName);
  renderComponent(generateFilmCardDetailsTemplate(film), footer, `afterend`);
};

for (const filmCard of filmCards) {
  filmCard.addEventListener(`click`, renderFilmCardDetails);
}


