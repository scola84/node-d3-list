import { select } from 'd3-selection';
import Primary from './primary';
import Secondary from './secondary';

export default class Item {
  constructor() {
    this._index = null;
    this._first = null;
    this._model = null;
    this._format = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola item', true)
      .styles({
        'background': '#FFF',
        'display': 'flex',
        'flex-direction': 'row',
        'line-height': '3em'
      });

    this._padding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid transparent',
        'order': 1,
        'width': '1em'
      });

    this._handleModelSet = (e) => this._modelSet(e);

    this.first(false);
  }

  destroy() {
    if (this._model) {
      this._unbindModel();
      this._model = null;
    }

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  index(value) {
    if (typeof value === 'undefined') {
      return this._index;
    }

    this._index = value;
    return this;
  }

  first(value) {
    if (value === this._first) {
      return this;
    }

    this._first = value;
    this._root.style('border-color',
      value === true ? 'transparent' : '#CCC');

    return this;
  }

  model(value, format = (v) => v) {
    this._model = value;
    this._format = format;

    this._bindModel();

    this._modelSet({
      action: 'model',
      name: this._name,
      value: value.get(this._name)
    });

    return this;
  }

  name(itemName) {
    this._name = itemName;
    return this;
  }

  icon(value, size) {
    this.primary().icon(value, size);
    return this;
  }

  text(value, size) {
    this.primary().text(value, size);
    return this;
  }

  primary() {
    if (!this._primary) {
      this._primary = new Primary()
        .item(this);
    }

    return this._primary;
  }

  secondary() {
    if (!this._secondary) {
      this._secondary = new Secondary()
        .item(this);
    }

    return this._secondary;
  }

  _bindModel() {
    this._model.setMaxListeners(this._model.getMaxListeners() + 1);
    this._model.addListener('set', this._handleModelSet);
  }

  _unbindModel() {
    this._model.setMaxListeners(this._model.getMaxListeners() - 1);
    this._model.removeListener('set', this._handleModelSet);
  }

  _modelSet() {
    throw new Error('Not implemented');
  }
}
