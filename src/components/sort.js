const sorts = [{
  name: `default`,
  isActive: true
},
{
  name: `date`,
  isActive: false
},
{
  name: `rating`,
  isActive: false
}];

const generateSortItemTemplate = ({name, isActive}) => `<li><a href="#" class="sort__button${isActive ? ` sort__button--active` : ``}">Sort by ${name}</a></li>`.trim();

const generateSortItemsTemplate = (items) => items.map((item) => generateSortItemTemplate(item)).join(``);

const generateSortTemplate = (items) => {
  const sortTemplate =
  `<ul class="sort">
  ${generateSortItemsTemplate(items)}
  </ul>`.trim();

  return sortTemplate;
};

export {sorts};
export {generateSortTemplate};
