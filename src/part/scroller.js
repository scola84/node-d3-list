/* eslint prefer-reflect: "off" */

import { event, select } from 'd3';
import { scroller } from '@scola/d3-scroller';
import Part from '../part';
import 'd3-selection-multi';

export default class Scroller extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola scroller', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': 1,
        'height': '3em'
      });

    this._scroller = scroller();

    this._scroller.root().styles({
      'flex': 1
    });

    this._root.node()
      .appendChild(this._scroller.root().node());

    this._padding = this._root
      .append('div')
      .styles({
        'width': '1em'
      });

    this._handleScroll = () => this._scroll(event);
    this._bindScroller();
  }

  destroy() {
    this._unbindScroller();
    this._scroller.destroy();
    super.destroy();
  }

  scroller() {
    return this._scroller;
  }

  resize() {
    this._scroller
      .resize()
      .value(this._model.get(this._name));
  }

  _bindScroller() {
    this._scroller.root().on('scroll.scola-list', this._handleScroll);
  }

  _unbindScroller() {
    this._scroller.root().on('scroll.scola-list', null);
  }

  _scroll() {
    this._model.set(this._name, event.detail.value);
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    this._scroller.value(setEvent.value, false);
  }
}
