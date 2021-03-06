/* eslint prefer-reflect: "off" */

import { select } from 'd3';
import { Observer } from '@scola/d3-model';
import Item from './item';

export default class List extends Observer {
  constructor() {
    super();

    this._gesture = null;
    this._items = new Set();
    this._rootMedia = null;
    this._bodyMedia = null;
    this._inset = false;
    this._item = null;
    this._message = null;
    this._prepare = null;
    this._title = null;
    this._comment = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola list', true)
      .styles({
        'box-sizing': 'content-box',
        'margin-bottom': '2em',
        'overflow': 'hidden'
      });

    this._title = this._root
      .append('div')
      .classed('scola title', true)
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.9em',
        'justify-content': 'space-between',
        'padding': '0 1.111em 0.555em',
        'text-transform': 'uppercase'
      });

    this._titleText = this._title
      .append('span')
      .classed('scola text', true)
      .styles({
        'font-size': 'inherit'
      });

    this._titleIcon = this._title
      .append('span')
      .classed('scola icon ion-ios-arrow-down', true)
      .styles({
        'display': 'none',
        'font-size': 'inherit',
        'height': '1em',
        'text-align': 'center',
        'width': '1em'
      });

    this._body = this._root
      .append('div')
      .classed('scola body', true)
      .styles({
        'border-bottom': '1px solid #CCC',
        'border-top': '1px solid #CCC',
        'overflow': 'hidden'
      });

    this._comment = this._root
      .append('div')
      .classed('scola comment', true)
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.9em',
        'line-height': '1.5em',
        'padding': '0.75em 1.1em 0'
      });

    this._bindBody();
  }

  destroy() {
    super.destroy();

    this._unbindBody();
    this._unbindTitle();
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

  items() {
    return this._items;
  }

  filled() {
    return this._items.size > 0;
  }

  prepare(value = null) {
    if (value === null) {
      return this._prepare;
    }

    this._prepare = value;
    return this;
  }

  item(value = null) {
    if (value === null) {
      return this._item;
    }

    this._item = value;
    return this;
  }

  model(value = null) {
    value = super.model(value);

    if (value === null) {
      return value;
    }

    if (this._model.get(this._name) === false) {
      this._root.styles({
        'height': '1.5em',
        'border-bottom': '1px solid #CCC'
      });
    }

    this._titleIcon
      .style('display', null);

    this._bindTitle();
    return this;
  }

  inset(width = '48em') {
    if (width === null) {
      return this._inset;
    }

    if (width === false) {
      this._deleteInset();
    }

    if (this._rootMedia === null) {
      this._insertInset(width);
    }

    return this;
  }

  title(value = null) {
    if (value === null) {
      return this._title;
    }

    if (value === false) {
      return this._hideTitle();
    }

    return this._showTitle(value);
  }

  comment(value = null) {
    if (value === null) {
      return this._comment;
    }

    if (value === false) {
      return this._hideComment();
    }

    return this._showComment(value);
  }

  append(item, action = true) {
    if (action === false) {
      return this._deleteItem(item);
    }

    return this._insertItem(item);
  }

  clear() {
    this._items.forEach((item) => {
      item.destroy();
    });

    this._items.clear();
    this._message = null;

    return this;
  }

  disabled(value) {
    this._items.forEach((item) => {
      item.disabled(value);
    });

    return this;
  }

  message(value = null) {
    if (value === null) {
      return this._message;
    }

    if (value === false) {
      return this._deleteMessage();
    }

    if (this._message) {
      return this._updateMessage(value);
    }

    return this._insertMessage(value);
  }

  render(data) {
    if (this._prepare) {
      this._prepare(data, this);
    }

    if (this._items.size > 0) {
      this.clear();
    }

    data.forEach((datum, index) => {
      this.append(this._item(datum, index));
    });

    return this;
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
      .media(`not all and (min-width: ${width})`)
      .call(() => { this._inset = false; })
      .media(`(min-width: ${width})`)
      .call(() => { this._inset = true; })
      .styles({
        'margin-left': '1em',
        'margin-right': '1em'
      })
      .start();

    this._bodyMedia = this._body
      .media(`(min-width: ${width})`)
      .styles({
        'border-bottom': 'none',
        'border-radius': '0.5em',
        'border-top': 'none'
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

  _deleteMessage() {
    if (this._message) {
      this.append(this._message, false);
      this._message.destroy();
      this._message = null;
    }

    return this;
  }

  _insertMessage(text) {
    this._message = this
      .append(new Item());

    this._message
      .text(text)
      .primary();

    return this;
  }

  _updateMessage(text) {
    this._message
      .part(0)
      .text(text);

    return this;
  }

  _showTitle(title) {
    this._title
      .style('display', 'flex');

    this._titleText
      .text(title);

    return this;
  }

  _hideTitle() {
    this._title
      .style('display', 'none');

    return this;
  }

  _showComment(comment) {
    this._comment
      .style('display', 'block')
      .text(comment);

    return this;
  }

  _hideComment() {
    this._comment
      .style('display', 'none');

    return this;
  }

  _insertItem(item) {
    item.first(this._items.size === 0);

    this._items.add(item);
    this._body.append(() => item.root().node());

    return item;
  }

  _deleteItem(item) {
    this._items.delete(item);
    item.root().remove();

    return item;
  }

  _bindTitle() {
    if (this._title) {
      this._title
        .classed('click', true)
        .style('cursor', 'pointer')
        .on('click.scola-list', () => this._click());
    }
  }

  _unbindTitle() {
    if (this._title) {
      this._title
        .classed('click', false)
        .style('cursor', null)
        .on('click.scola-list', null);
    }
  }

  _click() {
    if (this._model) {
      const value = this._model.get(this._name);
      this._model.set(this._name, value === false ? true : false);
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const bodyHeight = this._body.boundingRect('height');
    const commentHeight = this._comment.boundingRect('height');
    const titleHeight = this._title.boundingRect('height');

    if (setEvent.value === true) {
      this._root.style('border', 0);
    }

    this._root
      .transition()
      .style('height', () => {
        return setEvent.value !== false ? (
          titleHeight +
          bodyHeight +
          commentHeight
        ) + 'px' : titleHeight + 'px';
      })
      .on('end', () => {
        if (this._root === null) {
          return;
        }

        if (setEvent.value !== false) {
          this._root.style('height', null);
        } else {
          this._root.style('border-bottom', '1px solid #CCC');
        }
      });

    this._titleIcon
      .transition()
      .style('transform', () => {
        return setEvent.value !== false ?
          'rotate(0deg)' :
          'rotate(-90deg)';
      });
  }
}
