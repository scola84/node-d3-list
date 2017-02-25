import { select } from 'd3';

export default class Button {
  constructor() {
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

    this._text = this._root
      .append('button')
      .attrs({
        'tabindex': -1,
        'type': 'button'
      })
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'cursor': 'pointer',
        'margin': 0,
        'padding': 0
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

  tabindex(value = null) {
    if (value === null) {
      return this._text.attr('tabindex');
    }

    this._text.attr('tabindex', value);
    return this;
  }

  text(value = null) {
    if (value === null) {
      return this._text;
    }

    this._text.text(value);
    return this;
  }

  first() {}
}
