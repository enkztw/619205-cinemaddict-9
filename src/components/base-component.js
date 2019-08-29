import {createElement} from '../dom-utils';

export default class BaseComponent {
  constructor() {
    if (new.target === BaseComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  renderElement(container, position = `beforeend`) {
    container.insertAdjacentElement(position, this.element);
  }

  removeElement() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
}
