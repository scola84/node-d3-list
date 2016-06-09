import { select } from 'd3-selection';

export default class StaticList {
  constructor() {
    this._items = new Set();

    this._outer = select('body')
      .append('div')
      .classed('scola list static', true)
      .styles({
        'padding-bottom': '3em',
        'padding-top': 0
      });

    this._title = this._outer
      .append('div')
      .classed('scola title', true)
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.9em',
        'padding': '0 1.1em 0.5em 1.1em',
        'text-transform': 'uppercase'
      });

    this._body = this._outer
      .append('div')
      .classed('scola body', true)
      .styles({
        'border-width': '1px 0',
        'border-color': '#CCC',
        'border-style': 'solid'
      });
  }

  destroy() {
    this._items.forEach((item) => {
      item.destroy();
    });

    this._outer.remove();
  }

  outer() {
    return this._outer;
  }

  node() {
    return this._outer.node();
  }

  append(item) {
    this._items.add(item);
    this._body.node().appendChild(item.node());
  }

  inset() {
    this._outer
      .style('margin', '0 1em');

    this._body.styles({
      'border-style': 'none',
      'border-radius': '0.5em',
      'overflow': 'hidden'
    });

    return this;
  }

  title(text) {
    this._title.style('display', 'block').text(text);
    return this;
  }

  top() {
    this._outer.style('padding-top', '3em');
    return this;
  }
}
