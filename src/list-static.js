import { select } from 'd3-selection';

export default class StaticList {
  constructor() {
    this._first = null;
    this._items = new Set();

    this._title = null;
    this._comment = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola list static', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'column',
        'padding-bottom': '3em'
      });

    this._body = this._root
      .append('div')
      .classed('scola body', true)
      .styles({
        'border-width': '1px 0',
        'border-color': '#CCC',
        'border-style': 'solid',
        'order': 2
      });

    this.first(false);
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

  append(item, action) {
    item.first(this._items.size === 0);

    if (action === true) {
      this._items.add(item);
      this._body.node().appendChild(item.root().node());
    } else if (action === false) {
      this._items.delete(item);
      item.root().remove();
    }

    return this;
  }

  comment(comment) {
    if (typeof comment === 'undefined') {
      return this._comment;
    }

    if (comment === false) {
      return this._deleteComment();
    }

    if (this._comment) {
      return this._updateComment(comment);
    }

    return this._insertComment(comment);
  }

  title(title) {
    if (typeof title === 'undefined') {
      return this._title;
    }

    if (title === false) {
      return this._deleteTitle();
    }

    if (this._title) {
      return this._updateTitle(title);
    }

    return this._insertTitle(title);
  }

  inset() {
    this._root.style('margin', '0 1em');

    this._body.styles({
      'border-style': 'none',
      'border-radius': '0.5em',
      'overflow': 'hidden'
    });

    return this;
  }

  first(first) {
    if (first === this._first) {
      return this;
    }

    this._first = first;
    this._root.style('padding-top', first === true ? '3em' : 0);

    return this;
  }

  _insertComment(comment) {
    this._comment = this._root
      .append('div')
      .classed('scola comment', true)
      .styles({
        'color': '#AAA',
        'font-size': '0.9em',
        'line-height': '1.5em',
        'order': 3,
        'padding': '0.75em 1.1em 0'
      })
      .text(comment);

    return this;
  }

  _updateComment(comment) {
    this._comment.text(comment);
    return this;
  }

  _deleteComment() {
    if (this._comment) {
      this._comment.remove();
      this._comment = null;
    }

    return this;
  }

  _insertTitle(title) {
    this._title = this._root
      .append('div')
      .classed('scola title', true)
      .styles({
        'color': '#AAA',
        'font-size': '0.9em',
        'order': 1,
        'padding': '0 1.1em 0.75em',
        'text-transform': 'uppercase'
      })
      .text(title);

    return this;
  }

  _updateTitle(title) {
    this._title.text(title);
    return this;
  }

  _deleteTitle() {
    if (this._title) {
      this._title.remove();
      this._title = null;
    }

    return this;
  }
}
