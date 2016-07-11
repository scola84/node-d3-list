import Item from './item';

export default class InputItem extends Item {
  constructor() {
    super();

    this._root.classed('input', true);

    this._label = this._root
      .append('div')
      .classed('scola label', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 3
      });

    this._labelPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 4,
        'width': '1em'
      });

    this._inputRoot = this._root
      .append('div')
      .classed('scola input-root', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'order': 5,
        'flex': 1
      });

    this._input = this._inputRoot
      .append('input')
      .classed('scola input', true)
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'height': '3em',
        'padding': 0,
        'width': '100%'
      });

    this._inputPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 6,
        'width': '1em'
      });
  }

  input() {
    return this._input;
  }

  label(text, width) {
    if (typeof text === 'undefined') {
      return this._label;
    }

    this._label
      .text(text)
      .style('width', width);

    return this;
  }
}
