const filters = [{
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

const getFilter = (name) => filters.find((filter) => filter.name === name);

const setFilterCount = (filter, count) => {
  filter.count = count;
};

const generateFilterCountTemplate = (count) => (count) ? `<span class="main-navigation__item-count">${count}</span>` : ``;

const generateFilterTemplate = ({name, title, isActive, count}) => {
  const navigationItemTemplate =
  `<a href="#${name}" class="main-navigation__item${name === `stats` ? ` main-navigation__item--additional` : ``}${isActive ? ` main-navigation__item--active` : ``}">${title} ${generateFilterCountTemplate(count)}</a>`.trim();

  return navigationItemTemplate;
};

const generateFiltersTemplate = (items) => items.map(generateFilterTemplate).join(``);

const generateFiltersBlockTemplate = (items) => {
  const navigationTemplate =
  `<nav class="main-navigation">
    ${generateFiltersTemplate(items)}
  </nav>`.trim();

  return navigationTemplate;
};

export {filters, getFilter, setFilterCount, generateFiltersBlockTemplate};
