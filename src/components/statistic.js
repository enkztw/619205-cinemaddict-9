const getTotalTime = (films) => {
  const time = films.map((film) => film.duration);
  const totalTime = time.reduce((acc, curr) => ({hours: Math.floor((acc.hours + curr) / 60), minutes: (acc.minutes + curr) % 60}), {hours: 0, minutes: 0});

  return totalTime;
};

const getTopGenre = (films) => {
  if (films.length === 0) {
    return undefined;
  }

  const genresCounter = {
    Drama: 0,
    Comedy: 0,
    Mystery: 0,
    Romance: 0,
    History: 0
  };


  const genres = films.map((film) => [...film.genres]).flat();
  for (const genre of genres) {
    genresCounter[genre] += 1;
  }


  const findTopGenre = (counter) => Object.keys(counter).reduce((acc, curr) => (counter[acc] > counter[curr] ? acc : curr));

  return findTopGenre(genresCounter);
};

const generateUserRankTemplate = (rank, avatar) => {
  return `<p class="statistic__rank">
  Your rank 
  <img class="statistic__img" src="images/${avatar}" alt="Avatar" width="35" height="35"> 
  <span class="statistic__rank-label">${rank}</span>
</p>`;
};

const generateStatisticTemplate = (rank, avatar, watchedFilms) => `<section class="statistic visually-hidden">
${watchedFilms.length > 0 ? generateUserRankTemplate(rank, avatar) : ``}

<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
  <p class="statistic__filters-description">Show stats:</p>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
  <label for="statistic-all-time" class="statistic__filters-label">All time</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
  <label for="statistic-today" class="statistic__filters-label">Today</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
  <label for="statistic-week" class="statistic__filters-label">Week</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
  <label for="statistic-month" class="statistic__filters-label">Month</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
  <label for="statistic-year" class="statistic__filters-label">Year</label>
</form>

<ul class="statistic__text-list">
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">You watched</h4>
    <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Total duration</h4>
    <p class="statistic__item-text">${getTotalTime(watchedFilms).hours} <span class="statistic__item-description">h</span> ${getTotalTime(watchedFilms).minutes} <span class="statistic__item-description">m</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${getTopGenre(watchedFilms)}</p>
  </li>
</ul>

<div class="statistic__chart-wrap">
  <canvas class="statistic__chart" width="1000"></canvas>
</div>

</section>`.trim();

export {generateStatisticTemplate};
