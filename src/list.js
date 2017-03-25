/* eslint prefer-reflect: "off" */

import { select, transition } from 'd3';
import { Observer } from '@scola/d3-model';

export default class List extends Observer {
  constructor() {
    super();

    this._items = new Set();

    this._gesture = null;
    this._rootMedia = null;
    this._bodyMedia = null;
    this._inset = false;

    this._title = null;
    this._comment = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola list static', true)
      .styles({
        'margin-bottom': '3em',
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
        'order': 1,
        'padding': '0 1.1em 0.75em',
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
        'border-color': '#CCC',
        'border-style': 'solid',
        'border-width': '1px 0',
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

  inset(width = '48em') {
    if (width === null) {
      return this._inset;
    }

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

  disabled(value) {
    this._items.forEach((item) => item.disabled(value));
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
        'border-radius': '0.5em',
        'border-style': 'none'
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

  _showTitle(title) {
    this._title
      .style('display', 'flex');

    this._titleText
      .text(title);

    return this;
  }

  _hideTitle() {
    this._title.style('display', 'none');
    return this;
  }

  _showComment(comment) {
    this._comment
      .style('display', 'block')
      .text(comment);

    return this;
  }

  _hideComment() {
    this._comment.style('display', 'none');
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

  model(value) {
    value = super.model(value);
    this._root.style('height', 0);
    this._titleIcon.style('display', 'initial');
    this._bindTitle();
    return value;
  }

  _bindTitle() {
    if (this._title) {
      this._title.style('cursor', 'pointer');
      this._title.on('click.scola-list', () => this._click());
    }
  }

  _unbindTitle() {
    if (this._title) {
      this._title.style('cursor', 'initial');
      this._title.on('click.scola-list', null);
    }
  }

  _click() {
    if (this._model) {
      const value = this._model.get(this._name);
      this._model.set(this._name, value === false ? true : false);
    }
  }

  _set(setEvent) {
    const bodyHeight = parseFloat(this._body.style('height') || 0);
    const commentHeight = parseFloat(this._comment.style('height') || 0);
    const titleHeight = parseFloat(this._title.style('height') || 0);
    const borderWidth = parseFloat(this._body.style('border-width') || 0);

    const duration = setEvent.changed === false ? 0 : 250;

    const timeline = transition()
      .duration(duration)
      .on('end', () => {
        setTimeout(() => {
          if (setEvent.value === true) {
            this._root.style('height', null);
          }
        });
      });

    this._root
      .style('border-bottom', () => {
        return setEvent.value === true ? 0 : '1px solid #CCC';
      })
      .transition(timeline)
      .style('height', () => {
        return setEvent.value !== false ? (
          titleHeight +
          bodyHeight +
          commentHeight
        ) + 'px' : (titleHeight + borderWidth) + 'px';
      });

    this._titleIcon
      .transition(timeline)
      .style('transform', () => {
        return setEvent.value !== false ?
          'rotate(0deg)' :
          'rotate(-90deg)';
      });
  }
}
