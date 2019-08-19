const controls = [{
  name: `watchlist`,
  description: `add-to-watchlist`
},
{
  name: `watched`,
  description: `mark-as-watched`
},
{
  name: `favorite`,
  description: `favorite`
}];

const generateFilmControlTemplate = ({name, description}, isActive) => `<button class="film-card__controls-item button film-card__controls-item--${description} ${isActive ? `film-card__controls-item--active` : ``}">Add to ${name}</button>`;

const generateFilmControlsTemplate = (items, isActive) => items.map((item, index) => generateFilmControlTemplate(item, isActive[index])).join(``);

const generateFilmControlsBlockTemplate = (items, isActive) => {
  const filmControlsBlockTemplate =
  `<form class="film-card__controls">
  ${generateFilmControlsTemplate(items, isActive)}
  </form>`.trim();

  return filmControlsBlockTemplate;
};

const generateFilmCardTemplate = ({
  id,
  name,
  poster,
  rating,
  date,
  duration,
  genres,
  description,
  comments,
  isAdded,
  isWatched,
  isFavorite
}) => {
  const filmCardTemplate =
    `<article class="film-card" data-id="${id}">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date.getFullYear()}</span>
      <span class="film-card__duration">${Math.floor(duration / 60)}h ${duration % 60}m</span>
      <span class="film-card__genre">${Array.from(genres)[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    ${generateFilmControlsBlockTemplate(controls, [isAdded, isWatched, isFavorite])}
  </article>`.trim();

  return filmCardTemplate;
};

const generateFilmCardsTemplate = (items) => items.map(generateFilmCardTemplate).join(``);
const generateFilmCardsBlockTemplate = (items) => {
  const filmCardsTemplate =
    `<div class="films-list__container">
    ${generateFilmCardsTemplate(items)}
    </div>`.trim();

  return filmCardsTemplate;
};

export {controls, generateFilmCardsTemplate, generateFilmCardsBlockTemplate};
