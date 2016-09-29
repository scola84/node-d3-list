import { select } from 'd3-selection';
import 'd3-selection-multi';

export default class Button {
  constructor() {
    this._disabled = false;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola button', true)
      .styles({
        'background': '#FFF',
        'cursor': 'pointer',
        'line-height': '3em',
        'text-align': 'center'
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

  disabled(value) {
    if (typeof value === 'undefined') {
      return this._disabled;
    }

    this._root.classed('disabled', value);
    this._disabled = value;

    return this;
  }

  first() {}
}
