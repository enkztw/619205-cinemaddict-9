import {renderComponent} from './dom-utils';

import {generateSearchTemplate} from './components/search';

import {sorts} from './components/sort';
import {generateSortTemplate} from './components/sort';

import {films} from './data';

import PageController from './page-controller';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const statistics = footer.querySelector(`.footer__statistics p`);

// Search
renderComponent(generateSearchTemplate(), header);

// Sort
renderComponent(generateSortTemplate(sorts), main);

// Movies inside
statistics.textContent = `${films.length} movies inside`;

// Page init
const pageController = new PageController(main, header, footer, films);
pageController.init();
