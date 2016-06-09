import Item from './item';

export default class PlainItem extends Item {
  constructor() {
    super();

    this._outer.classed('plain', true);

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
        'flex': 1,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._paddingCenter = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'width': '1em'
      });

    this._sub = this._inner
      .append('div')
      .classed('scola sub', true)
      .styles({
        'border-top': '1px solid #CCC',
        'color': '#AAA',
        'display': 'flex'
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

  label(text) {
    this._label.text(text);
    return this;
  }

  sub(text) {
    this._sub.text(text);
    return this;
  }

  top() {
    this._label.style('border-top-style', 'none');
    this._paddingCenter.style('border-top-style', 'none');
    this._paddingRight.style('border-top-style', 'none');
    this._sub.style('border-top-style', 'none');

    return this;
  }
}
