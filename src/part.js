import { Observer } from '@scola/d3-model';

export default class Part extends Observer {
  constructor() {
    super();

    this._item = null;
    this._root = null;
    this._padding = null;
    
    this._disabled = false;
  }

  destroy() {
    super.destroy();

    this._root.dispatch('destroy');
    this._root.remove();
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

  disabled(value = null) {
    if (value === null) {
      return this._disabled;
    }

    this._disabled = value;
    this._root.classed('disabled', value);

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

  padding(action = null) {
    if (action === null) {
      return this._padding;
    }

    if (action === false) {
      return this._deletePadding();
    }

    return this._insertPadding();
  }

  show() {
    this._root.style('display', 'flex');
    return this;
  }

  hide() {
    this._root.style('display', 'none');
    return this;
  }

  _insertPadding() {
    this._padding = this._root
      .append('div')
      .styles({
        'width': '1em'
      });

    return this;
  }

  _deletePadding() {
    this._padding.remove();
    return this;
  }
}
