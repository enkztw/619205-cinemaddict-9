const getTotalTime = (films) => {
  if (films.length === 0) {
    return {hours: 0, minutes: 0};
  }
  const time = films.map((film) => film.duration);
  const totalTime = time.reduce((acc, curr) => {
    acc += curr;
    return acc;
  });

  return {hours: Math.floor(totalTime / 60), minutes: totalTime % 60};
};

const getTopGenre = (films) => {
  if (films.length === 0) {
    return `None`;
  }

  const genresCounter = {
    Drama: 0,
    Comedy: 0,
    Mystery: 0,
    Romance: 0,
    History: 0
  };

  for (const film of films) {
    for (const genre of film.genres) {
      genresCounter[genre] += 1;
    }
  }

  const findTopGenre = (counter) => {
    let maxCount = 0;
    let topGenre = ``;
    for (const [genre, count] of Object.entries(counter)) {
      if (count > maxCount) {
        maxCount = count;
        topGenre = genre;
      }
    }

    return topGenre;
  };

  return findTopGenre(genresCounter);
};

const generateStatisticTemplate = (rank, avatar, watchedFilms) => `<section class="statistic visually-hidden">
<p class="statistic__rank">
  Your rank 
  <img class="statistic__img" src="images/${avatar}" alt="Avatar" width="35" height="35"> 
  <span class="statistic__rank-label">${rank}</span>
</p>

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
