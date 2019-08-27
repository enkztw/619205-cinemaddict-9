import {generateShowMoreButtonTemplate} from './show-more-button';

const generateFilmListTemplate = (title = `All movies. Upcoming`, isExtra = false) => {
  const filmListTemplate =
  `<section class="films-list${isExtra ? `--extra` : ``}" data-name="${title}">
  <h2 class="films-list__title ${!isExtra ? `visually-hidden` : ``}">${title}</h2>
  <div class="films-list__container"></div>
  ${!isExtra ? generateShowMoreButtonTemplate() : ``}
  </section>`.trim();

  return filmListTemplate;
};

export {generateFilmListTemplate};
