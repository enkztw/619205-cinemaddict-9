import {generateShowMoreButtonTemplate} from './show-more-button';
import {generateNoFilmsTemplate} from './no-films';
import {films} from '../data';

const generateFilmsContainer = () => films.length > 0 ? `<div class="films-list__container"></div>` : `${generateNoFilmsTemplate()}`;

const generateFilmListTemplate = (title = `All movies. Upcoming`, isExtra = false) => {
  if (isExtra && films.length === 0) {
    return ``;
  }

  const filmListTemplate =
  `<section class="films-list${isExtra ? `--extra` : ``}" data-name="${title}">
  <h2 class="films-list__title ${!isExtra ? `visually-hidden` : ``}">${title}</h2>
  ${generateFilmsContainer()}
  ${!isExtra ? generateShowMoreButtonTemplate() : ``}
  </section>`.trim();

  return filmListTemplate;
};

export {generateFilmListTemplate};
