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
        'flex': 1,
        'height': '3em'
      });

    this._scroller = scroller()
      .horizontal();

    this._scroller.root().styles({
      'flex': 1,
      'height': '2em'
    });

    this._root.node()
      .appendChild(this._scroller.root().node());

    this._padding = this._root
      .append('div')
      .styles({
        'width': '1em'
      });
  }

  scroller() {
    return this._scroller;
  }

  name(value = null) {
    value = this._scroller.name(value);
    return value === this._scroller ? this : value;
  }

  model(value, format = (v) => v) {
    this._scroller.model(value, format);
    return this;
  }

  domain(value = null) {
    value = this._scroller.domain(value);
    return value === this._scroller ? this : value;
  }

  step(value = null) {
    value = this._scroller.step(value);
    return value === this._scroller ? this : value;
  }

  ticks(value = null) {
    value = this._scroller.ticks(value);
    return value === this._scroller ? this : value;
  }

  tabindex(value = null) {
    value = this._scroller.tabindex(value);
    return value === this._scroller ? this : value;
  }

  resize() {
    this._scroller.resize();
    return this;
  }

  size(value = null) {
    if (value === null) {
      return this._root.style('width');
    }

    this._root.styles({
      'flex': 'none',
      'width': value
    });

    return this;
  }
}
