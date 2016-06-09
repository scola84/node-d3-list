import Item from './item';

export default class InputItem extends Item {
  constructor() {
    super();

    this._outer.classed('input', true);

    this._iconOuter = this._inner
      .append('div')
      .classed('scola icon-outer', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid transparent',
        'display': 'none',
        'width': '2.25em'
      });

    this._icon = this._iconOuter
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

    this._paddingCenter = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'width': '1em'
      });

    this._inputOuter = this._inner
      .append('div')
      .classed('scola input-outer', true)
      .styles({
        'border-top': '1px solid #CCC',
        'display': 'flex',
        'flex': 1
      });

    this._input = this._inputOuter
      .append('input')
      .classed('scola input', true)
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'padding': 0,
        'width': '100%'
      });

    this._paddingRight = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'width': '0.5em'
      });
  }

  icon(name, size = '2em') {
    this._iconOuter
      .style('display', 'flex');

    this._icon
      .classed(name, true)
      .style('font-size', size);

    return this;
  }

  label(text, width) {
    this._label
      .text(text)
      .style('width', width);

    return this;
  }

  top() {
    this._label.style('border-top-style', 'none');
    this._paddingCenter.style('border-top-style', 'none');
    this._inputOuter.style('border-top-style', 'none');
    this._paddingRight.style('border-top-style', 'none');

    return this;
  }

  value() {
    return this._input.property('value');
  }
}
