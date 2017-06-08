import { select } from 'd3';
import Part from '../part';

export default class Icon extends Part {
  constructor() {
    super();

    this._lines = [];

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola icon', true)
      .styles({
        'border-top': '1px solid transparent',
        'padding': '0.375em 0',
        'color': '#000',
        'width': '1.25em'
      });

    this._container = this._root
      .append('div')
      .styles({

      });

    this.show(true);
  }

  class(value = null) {
    if (value === null) {
      return this._current.classed();
    }

    this._current.attr('class', null);
    this._current.classed(value, true);

    return this;
  }

  color(value = null) {
    if (value === null) {
      return this._current.style('color');
    }

    this._current.style('color', value);
    return this;
  }

  line(index) {
    if (typeof this._lines[index] === 'undefined') {
      this._lines[index] = this._createIcon();
    }

    this._current = this._lines[index];
    return this;
  }

  size(value = null) {
    if (value === null) {
      return this._current.style('font-size');
    }

    this._current.style('font-size', value);
    return this;
  }

  _createIcon() {
    return this._container
      .append('div')
      .styles({
        'color': '#777',
        'display': 'flex',
        'font-size': '1.25em',
        'height': '1.175em',
        'padding': '0.125em'
      });
  }
}
