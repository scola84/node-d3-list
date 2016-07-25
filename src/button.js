import { select } from 'd3-selection';

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

  text(text) {
    this._root.text(text);
    return this;
  }

  disabled(disabled) {
    if (typeof disabled === 'undefined') {
      return this._disabled;
    }

    this._root.classed('disabled', disabled);
    this._disabled = disabled;

    return this;
  }

  first() {}
}
