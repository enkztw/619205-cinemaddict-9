import BaseComponent from './base-component';

export default class Filter extends BaseComponent {
  constructor(name, title, isActive, count) {
    super();
    this._name = name;
    this._title = title;
    this._isActive = isActive;
    this._count = count;
  }

  get countTemplate() {
    return this._count ? `<span class="main-navigation__item-count">${this._count}</span>` : ``;
  }

  get template() {
    return `<a href="#${this._name}" class="main-navigation__item${this._name === `stats` ? ` main-navigation__item--additional` : ``}${this._isActive ? ` main-navigation__item--active` : ``}">${this._title} ${this.countTemplate}</a>`;
  }
}
