import { select } from 'd3-selection';

export default class Item {
  constructor() {
    this._id = null;
    this._index = null;

    this._first = null;
    this._icon = null;

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

    this.first(false);
  }

  destroy() {
    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  id(id) {
    if (typeof id === 'undefined') {
      return this._id;
    }

    this._id = id;
    return this;
  }

  index(index) {
    if (typeof index === 'undefined') {
      return this._index;
    }

    this._index = index;
    return this;
  }

  icon(name, size = '2em') {
    if (typeof name === 'undefined') {
      return this._icon;
    }

    if (name === false) {
      this._icon.remove();
      this._icon = null;

      return this;
    }

    this._icon = this._root
      .append('div')
      .classed('scola icon', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid transparent',
        'display': 'flex',
        'order': 2,
        'width': '2.25em'
      });

    this._icon
      .append('div')
      .classed(name, true)
      .style('font-size', size);

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
}
