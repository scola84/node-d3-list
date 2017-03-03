import { select } from 'd3';
import { Observer } from '@scola/d3-model';
import Button from './part/button';
import Icon from './part/icon';
import Scroller from './part/scroller';
import Switch from './part/switch';
import Input from './part/input';
import Text from './part/text';

export default class Item extends Observer {
  constructor() {
    super();

    this._first = null;
    this._parts = [];

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola item', true)
      .styles({
        'background': '#FFF'
      });

    this._over = this._root
      .append('div')
      .classed('scola over', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row'
      });

    this._padding = this._over
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid transparent',
        'order': 1,
        'width': '1em'
      });

    this._bindRoot();
    this.first(false);
  }

  destroy() {
    super.destroy();

    this._unbindRoot();

    this._parts.forEach((part) => {
      part.destroy();
    });

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  value(itemValue = null) {
    if (itemValue === null) {
      return this._value;
    }

    this._value = itemValue;
    return this;
  }

  order(part = null, value = -1) {
    if (part !== null) {
      this._move(part, value);
    }

    this._order();
  }

  part(index) {
    return this._parts[index];
  }

  button(value = null) {
    const button = new Button()
      .item(this);

    button.class(value);
    this._add(button);

    return button;
  }

  icon(value = null) {
    const icon = new Icon()
      .item(this);

    icon.class(value);
    this._add(icon);

    return icon;
  }

  input(value = null) {
    const input = new Input()
      .item(this);

    input.type(value);
    this._add(input);

    return input;
  }

  scroller() {
    const scroller = new Scroller()
      .item(this);

    this._add(scroller);
    return scroller;
  }

  switch () {
    const part = new Switch()
      .item(this);

    this._add(part);
    return part;
  }

  text(value = null) {
    const text = new Text()
      .item(this);

    text.text(value);
    this._add(text);

    return text;
  }

  first(value = null) {
    if (value === null) {
      return this._first;
    }

    this._first = value;
    this._over.style('border-color', () => {
      return value === true ? 'transparent' : '#CCC';
    });

    return this;
  }

  _bindRoot() {
    this._over.on('click.scola-item', () => this._click());
  }

  _unbindRoot() {
    this._over.on('click.scola-item', null);
  }

  _add(part) {
    this._parts.push(part);
    this._order();
  }

  _move(part, value) {
    this._parts.splice(value, 0,
      this._parts.splice(
        this._parts.indexOf(part), 1).pop());
  }

  _order() {
    this._parts.forEach((part, index) => {
      part.order(index + 2, false);
      this._over.append(() => part.root().node());
    });
  }

  _click() {}
}
