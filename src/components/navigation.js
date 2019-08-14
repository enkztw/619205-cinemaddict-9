const navigates = [{
  name: `all`,
  title: `All movies`,
  isActive: true,
  count: 0
},
{
  name: `watchlist`,
  title: `Watchlist`,
  isActive: false,
  count: 0,
},
{
  name: `history`,
  title: `History`,
  isActive: false,
  count: 0
},
{
  name: `favorites`,
  title: `Favorites`,
  isActive: false,
  count: 0
},
{
  name: `stats`,
  title: `Stats`,
  isActive: false
}];

const getNavigate = (name) => navigates.find((navigate) => navigate.name === name);

const setNavigateCount = (navigate, count) => {
  navigate.count = count;
};

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

export {navigates, getNavigate, setNavigateCount, generateNavigationTemplate};
