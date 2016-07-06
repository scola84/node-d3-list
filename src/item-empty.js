import { select } from 'd3-selection';

export default class EmptyItem {
  constructor() {
    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola empty', true)
      .styles({
        'align-items': 'center',
        'color': '#AAA',
        'display': 'flex',
        'flex': 1,
        'font-size': '2em',
        'justify-content': 'center'
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
}
