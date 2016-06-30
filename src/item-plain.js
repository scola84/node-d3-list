import Item from './item';

export default class PlainItem extends Item {
  constructor() {
    super();

    this._sub = null;
    this._subPadding = null;

    this._root.classed('plain', true);

    this._label = this._root
      .append('div')
      .classed('scola label', true)
      .styles({
        'border-top': '1px solid #CCC',
        'flex': 1,
        'order': 3,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._labelPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'order': 4,
        'width': '1em'
      });
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

    if (text === false) {
      this._sub.remove();
      this._sub = null;

      this._subPadding.remove();
      this._subPadding = null;

      return this;
    }

    if (this._sub) {
      this._sub.text(text);
      return this;
    }

    this._sub = this._root
      .append('div')
      .classed('scola sub', true)
      .styles({
        'border-top': '1px solid #CCC',
        'color': '#AAA',
        'order': 5
      })
      .text(text);

    this._subPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid #CCC',
        'order': 6,
        'width': '0.5em'
      });

    return this;
  }

  top() {
    this._label.style('border-top-style', 'none');
    this._labelPadding.style('border-top-style', 'none');

    if (this._sub) {
      this._sub.style('border-top-style', 'none');
      this._subPadding.style('border-top-style', 'none');
    }

    return this;
  }
}
