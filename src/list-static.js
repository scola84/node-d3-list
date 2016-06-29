import { select } from 'd3-selection';

export default class StaticList {
  constructor() {
    this._items = new Set();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola list static', true)
      .styles({
        'padding-bottom': '3em',
        'padding-top': 0
      });

    this._title = this._root
      .append('div')
      .classed('scola title', true)
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.9em',
        'padding': '0 1.1em 0.75em',
        'text-transform': 'uppercase'
      });

    this._body = this._root
      .append('div')
      .classed('scola body', true)
      .styles({
        'border-width': '1px 0',
        'border-color': '#CCC',
        'border-style': 'solid'
      });

    this._comment = this._root
      .append('div')
      .classed('scola comment', true)
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.9em',
        'line-height': '1.4em',
        'padding': '0.75em 1.1em 0'
      });
  }

  destroy() {
    this._items.forEach((item) => item.destroy());
    this._items.clear();

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  append(item, action = true) {
    if (action === true) {
      if (this._items.size === 0) {
        item.top();
      }

      this._items.add(item);
      this._body.node().appendChild(item.root().node());
    } else if (action === false) {
      this._items.delete(item);
      item.root().remove();
    }

    return this;
  }

  comment(text) {
    if (typeof text === 'undefined') {
      return this._comment;
    }

    this._comment
      .style('display', 'block')
      .text(text);

    return this;
  }

  title(text) {
    if (typeof text === 'undefined') {
      return this._title;
    }

    this._title
      .style('display', 'block')
      .text(text);

    return this;
  }

  inset() {
    this._root
      .style('margin', '0 1em');

    this._body.styles({
      'border-style': 'none',
      'border-radius': '0.5em',
      'overflow': 'hidden'
    });

    return this;
  }

  top() {
    this._root.style('padding-top', '3em');
    return this;
  }
}
