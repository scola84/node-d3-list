import { select } from 'd3-selection';

export default class Header {
  constructor() {
    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola header', true)
      .styles({
        'background': '#EEE',
        'font-weight': 'bold',
        'height': '2em',
        'line-height': '2em',
        'padding': '0 1em'
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

  text(value) {
    this._root.text(value);
    return this;
  }
}
