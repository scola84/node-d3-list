import { select } from 'd3';
import Part from '../part';

export default class Icon extends Part {
  constructor() {
    super();

    this._current = null;
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

  current() {
    return this._current;
  }

  line(index) {
    if (typeof this._lines[index] === 'undefined') {
      this._lines[index] = this._createIcon();
    }

    this._current = this._lines[index];
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
