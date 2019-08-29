import {films} from '../data';

const generateShowMoreButtonTemplate = () => `<button class="films-list__show-more${films.length === 0 ? ` visually-hidden` : ``}">Show more</button>`.trim();

export {generateShowMoreButtonTemplate};
