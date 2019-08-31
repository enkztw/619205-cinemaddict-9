import BaseComponent from './base-component';

export default class UserRank extends BaseComponent {
  constructor(watchedFilms) {
    super();
    this._watchedFilms = watchedFilms;
    this._rank = ``;
    this._avatar = `bitmap@2x.png`;
  }

  get userRank() {
    if (!this._watchedFilms.length) {
      return ``;
    }

    if (this._watchedFilms.length > 0 && this._watchedFilms.length <= 10) {
      return `Novice`;
    }
    if (this._watchedFilms.length <= 20) {
      return `Fan`;
    }

    return `Movie buff`;
  }

  get template() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this.userRank}</p>
    <img class="profile__avatar" src="images/${this._avatar}" alt="Avatar" width="35" height="35">
    </section>`;
  }
}
