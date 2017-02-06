import { select } from 'd3-selection';
import 'd3-selection-multi';
import '@scola/d3-media';

export default class List {
  constructor() {
    this._items = new Set();

    this._rootMedia = null;
    this._bodyMedia = null;
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
        'border-color': '#CCC',
        'border-style': 'solid',
        'border-width': '1px 0',
        'order': 2
      });

    this._bindBody();
  }

  destroy() {
    this._unbindBody();
    this._deleteInset();

    this._items.forEach((item) => {
      item.destroy();
    });

    this._items.clear();

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  body() {
    return this._body;
  }

  inset(width = '48em') {
    if (width === false) {
      this._deleteInset();
    }

    if (!this._rootMedia) {
      this._insertInset(width);
    }

    return this;
  }

  title(value = null) {
    if (value === null) {
      return this._title;
    }

    if (value === false) {
      return this._deleteTitle();
    }

    if (this._title) {
      return this._updateTitle(value);
    }

    return this._insertTitle(value);
  }

  comment(value = null) {
    if (value === null) {
      return this._comment;
    }

    if (value === false) {
      return this._deleteComment();
    }

    if (this._comment) {
      return this._updateComment(value);
    }

    return this._insertComment(value);
  }

  append(item, action = true) {
    if (action === false) {
      return this._deleteItem(item);
    }

    return this._insertItem(item);
  }

  _bindBody() {
    this._gesture = this._body
      .gesture()
      .on('panstart', (e) => e.stopPropagation())
      .on('panright', (e) => e.stopPropagation())
      .on('panleft', (e) => e.stopPropagation())
      .on('panend', (e) => e.stopPropagation())
      .on('swiperight', (e) => e.stopPropagation())
      .on('swipeleft', (e) => e.stopPropagation())
      .on('tap', (e) => e.stopPropagation());
  }

  _unbindBody() {
    if (this._gesture) {
      this._gesture.destroy();
      this._gesture = null;
    }
  }

  _insertInset(width) {
    this._rootMedia = this._root
      .media(`(min-width: ${width})`)
      .styles({
        'padding-left': '1em',
        'padding-right': '1em'
      })
      .start();

    this._bodyMedia = this._body
      .media(`(min-width: ${width})`)
      .styles({
        'border-radius': '0.5em',
        'border-style': 'none',
        'overflow': 'hidden'
      })
      .start();

    return this;
  }

  _deleteInset() {
    if (this._rootMedia) {
      this._rootMedia.destroy();
      this._rootMedia = null;
    }

    if (this._bodyMedia) {
      this._bodyMedia.destroy();
      this._bodyMedia = null;
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

  _insertItem(item) {
    item.first(this._items.size === 0);
    this._items.add(item);

    this._body.node()
      .appendChild(item.root().node());

    return item;
  }

  _deleteItem(item) {
    this._items.delete(item);
    item.root().remove();

    return item;
  }
}
