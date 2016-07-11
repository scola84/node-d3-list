import { select } from 'd3-selection';

export default class Item {
  constructor() {
    this._id = null;
    this._icon = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola item', true)
      .styles({
        'background': '#FFF',
        'border-top': '1px hidden #CCC',
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

  first() {
    this._root.style('border-top-color', 'transparent');
    return this;
  }
}
