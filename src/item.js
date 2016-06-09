import { select } from 'd3-selection';

export default class Item {
  constructor() {
    this._outer = select('body')
      .append('div')
      .classed('scola item', true)
      .styles({
        'background': '#FFF',
        'border-top': '1px hidden #CCC',
        'line-height': '3em'
      });

    this._inner = this._outer
      .append('div')
      .classed('scola inner', true)
      .styles({
        'display': 'flex'
      });

    this._paddingLeft = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid transparent',
        'width': '1em'
      });
  }

  outer() {
    return this._outer;
  }

  node() {
    return this._outer.node();
  }

  top() {
    throw new Error('Not implemented');
  }
}
