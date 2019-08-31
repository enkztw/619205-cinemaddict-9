import BaseComponent from './base-component';

export default class Sort extends BaseComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  sortTemplate({name, isActive}) {
    return `<li><a href="#" class="sort__button${isActive ? ` sort__button--active` : ``}" data-name="${name}">Sort by ${name}</a></li>`;
  }

  get template() {
    return `<ul class="sort">
    ${this._sorts.map(this.sortTemplate).join(``)}
    </ul>`;
  }
}
