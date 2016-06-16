import Item from './item';

export default class InputItem extends Item {
  constructor() {
    super();

    this._root.classed('input', true);

    this._iconRoot = this._inner
      .append('div')
      .classed('scola icon-root', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid transparent',
        'display': 'none',
        'width': '2.25em'
      });

    this._icon = this._iconRoot
      .append('div')
      .classed('scola icon', true)
      .styles({
        'font-size': '2em'
      });

    this._label = this._inner
      .append('div')
      .classed('scola label', true)
      .styles({
        'border-top': '1px solid #CCC',
        'display': 'flex'
      });

    this._labelPadding = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'width': '1em'
      });

    this._inputRoot = this._inner
      .append('div')
      .classed('scola input-root', true)
      .styles({
        'border-top': '1px solid #CCC',
        'display': 'flex',
        'flex': 1
      });

    this._input = this._inputRoot
      .append('input')
      .classed('scola input', true)
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'padding': 0,
        'width': '100%'
      });

    this._inputPadding = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'width': '0.5em'
      });
  }

  input() {
    return this._input;
  }

  icon(name, size = '2em') {
    if (typeof name === 'undefined') {
      return this._icon;
    }

    this._iconRoot
      .style('display', 'flex');

    this._icon
      .classed(name, true)
      .style('font-size', size);

    return this;
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

  top() {
    this._label.style('border-top-style', 'none');
    this._labelPadding.style('border-top-style', 'none');
    this._inputRoot.style('border-top-style', 'none');
    this._inputPadding.style('border-top-style', 'none');

    return this;
  }
}
