import { select } from 'd3-selection';
import Primary from './primary';
import Secondary from './secondary';

export default class Item {
  constructor() {
    this._index = null;
    this._first = null;
    this._model = null;

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

    this._handleModelChange = (e) => this._modelChange(e);

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

  index(index) {
    if (typeof index === 'undefined') {
      return this._index;
    }

    this._index = index;
    return this;
  }

  first(first) {
    if (first === this._first) {
      return this;
    }

    this._first = first;
    this._root.style('border-color',
      first === true ? 'transparent' : '#CCC');

    return this;
  }

  model(model) {
    this._model = model;

    this._bindModel();
    this._modelChange();

    return this;
  }

  name(name) {
    this._name = name;

    if (this._model) {
      this._modelChange();
    }

    return this;
  }

  icon(icon, size) {
    this.primary().icon(icon, size);
    return this;
  }

  text(text, size) {
    this.primary().text(text, size);
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
    this._model.on('change', this._handleModelChange);
  }

  _unbindModel() {
    this._model.setMaxListeners(this._model.getMaxListeners() - 1);
    this._model.removeListener('change', this._handleModelChange);
  }

  _modelChange() {
    throw new Error('Not implemented');
  }
}
