export default class Part {
  constructor() {
    this._item = null;
    this._root = null;
  }

  root() {
    return this._root;
  }

  item(value = null) {
    if (value === null) {
      return this._item;
    }

    this._item = value;
    return this;
  }

  order(value = null, update = true) {
    if (value === null) {
      return this._root.style('order');
    }

    this._root.style('order', value);

    if (update === true) {
      this._item.order(this, value);
    }

    return this;
  }
}
