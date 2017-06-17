import { select } from 'd3';
import { Observer } from '@scola/d3-model';
import Button from './part/button';
import Icon from './part/icon';
import Icons from './part/icons';
import Scroller from './part/scroller';
import Space from './part/space';
import Switch from './part/switch';
import Input from './part/input';
import Text from './part/text';
import Textarea from './part/textarea';
import Texts from './part/texts';

export default class Item extends Observer {
  constructor() {
    super();

    this._parts = [];

    this._disabled = false;
    this._first = false;
    this._visible = true;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola item', true)
      .styles({
        'background': '#FFF',
        'display': 'flex',
        'flex-direction': 'row'
      });

    this._padding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid transparent',
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

    this._parts = [];

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  disabled(value = null) {
    if (value === null) {
      return this._disabled;
    }

    this._disabled = value;
    this._root.classed('disabled', value);

    this._parts.forEach((part) => {
      part.disabled(value);
    });

    return this;
  }

  first(value = null) {
    if (value === null) {
      return this._first;
    }

    this._first = value;

    const color = value === true ?
      'transparent' : '#CCC';

    this._root.style('border-color', color);

    return this;
  }

  show(value = null) {
    if (value === null) {
      return this._visible;
    }

    this._visible = value;

    const display = value === true ?
      'flex' : 'none';

    this._root.style('display', display);

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

  icons() {
    const icon = new Icons()
      .item(this);

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

  space() {
    const space = new Space()
      .item(this);

    this._add(space);
    return space;
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

  textarea() {
    const textarea = new Textarea()
      .item(this);

    this._add(textarea);
    return textarea;
  }

  texts() {
    const texts = new Texts()
      .item(this);

    this._add(texts);
    return texts;
  }

  _bindRoot() {
    this._root.on('click.scola-item', () => this._click());
  }

  _unbindRoot() {
    this._root.on('click.scola-item', null);
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
      this._root.append(() => part.root().node());
    });
  }

  _click() {}
}
