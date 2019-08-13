import {getRandomNumber} from '../utils';

const navigates = [{
  name: `all`,
  title: `All movies`,
  isActive: true
},
{
  name: `watchlist`,
  title: `Watchlist`,
  isActive: false,
  count: getRandomNumber(0, 69),
},
{
  name: `history`,
  title: `History`,
  isActive: false,
  count: getRandomNumber(0, 69)
},
{
  name: `favorites`,
  title: `Favorites`,
  isActive: false,
  count: getRandomNumber(0, 69)
},
{
  name: `stats`,
  title: `Stats`,
  isActive: false
}];

const generateCountTemplate = (count) => (count) ? `<span class="main-navigation__item-count">${count}</span>` : ``;

const generateNavigationItemTemplate = ({name, title, isActive, count}) => {
  const navigationItemTemplate =
  `<a href="#${name}" class="main-navigation__item${name === `stats` ? ` main-navigation__item--additional` : ``}${isActive ? ` main-navigation__item--active` : ``}">${title} ${generateCountTemplate(count)}</a>`.trim();

  return navigationItemTemplate;
};

const generateNavigationItemsTemplate = (items) => items.map(generateNavigationItemTemplate).join(``);

const generateNavigationTemplate = (items) => {
  const navigationTemplate =
  `<nav class="main-navigation">
    ${generateNavigationItemsTemplate(items)}
  </nav>`.trim();

  return navigationTemplate;
};

export {navigates};
export {generateNavigationTemplate};
