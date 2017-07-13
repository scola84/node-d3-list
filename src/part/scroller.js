/* eslint prefer-reflect: "off" */

import { select } from 'd3';
import { scroller } from '@scola/d3-scroller';
import Part from '../part';

export default class Scroller extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola scroller', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': '1 1 0%',
        'height': '3em'
      });

    this._scroller = scroller()
      .horizontal();

    this._scroller.root().styles({
      'flex': '1 1 0%',
      'height': '2em'
    });

    this._root
      .append(() => this._scroller.root().node());

    this.padding(true);
  }

  scroller() {
    return this._scroller;
  }

  disabled(value = null) {
    if (value !== null) {
      this._scroller.disabled(value);
    }

    return super.disabled(value);
  }
}
