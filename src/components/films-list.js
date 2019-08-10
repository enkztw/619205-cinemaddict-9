import {generateFilmCardsBlockTemplate} from './film-card';
import {generateShowMoreButtonTemplate} from './show-more-button';

const generateFilmListTemplate = (items, title = `All movies. Upcoming`, isExtra = false) => {
  const filmListTemplate =
  `<section class="films-list${isExtra ? `--extra` : ``}">
  <h2 class="films-list__title ${!isExtra ? `visually-hidden` : ``}">${title}</h2>
  ${generateFilmCardsBlockTemplate(items)}
  ${!isExtra ? generateShowMoreButtonTemplate() : ``}
  </section>`.trim();

  return filmListTemplate;
};

export {generateFilmListTemplate};
