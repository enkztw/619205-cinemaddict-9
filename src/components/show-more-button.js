import {films} from '../data';

const generateShowMoreButtonTemplate = () => `<button class="films-list__show-more${films.length < 5 ? ` visually-hidden` : ``}">Show more</button>`.trim();

export {generateShowMoreButtonTemplate};
