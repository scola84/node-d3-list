import Item from './item';

export default class PlainItem extends Item {
  constructor() {
    super();

    this._root.classed('plain', true);

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
        'flex': 1,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._labelPadding = this._inner
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
        'display': 'none'
      });

    this._subPadding = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'display': 'none',
        'width': '0.5em'
      });
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

  label(text) {
    if (typeof text === 'undefined') {
      return this._label;
    }

    this._label.text(text);
    return this;
  }

  sub(text) {
    if (typeof text === 'undefined') {
      return this._sub;
    }

    this._subPadding
      .style('display', 'flex');

    this._sub
      .style('display', 'flex')
      .text(text);

    return this;
  }

  top() {
    this._label.style('border-top-style', 'none');
    this._labelPadding.style('border-top-style', 'none');
    this._sub.style('border-top-style', 'none');
    this._subPadding.style('border-top-style', 'none');

    return this;
  }
}
