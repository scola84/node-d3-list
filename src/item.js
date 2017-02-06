import { select } from 'd3-selection';
import Button from './part/button';
import Icon from './part/icon';
import Scroller from './part/scroller';
import Switch from './part/switch';
import Input from './part/input';
import Text from './part/text';
import 'd3-selection-multi';

export default class Item {
  constructor() {
    this._first = null;
    this._name = null;
    this._model = null;
    this._format = null;
    this._elements = [];

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
        'order': 1,
        'width': '1em'
      });

    this._handleClick = () => this._click();
    this._handleSet = (e) => this._set(e);

    this._bindRoot();
    this.first(false);
  }

  destroy() {
    this._unbindRoot();
    this._unbindModel();

    this._elements.forEach((element) => {
      element.destroy();
    });

    this._model = null;
    this._format = null;

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  name(value) {
    if (value === null) {
      return this._name;
    }

    this._name = value;
    return this;
  }

  value(itemValue = null) {
    if (itemValue === null) {
      return this._value;
    }

    this._value = itemValue;
    return this;
  }

  model(value, format = (v) => v) {
    this._model = value;
    this._format = format;

    this._bindModel();
    this._set({
      name: this._name,
      scope: 'model',
      value: value.get(this._name)
    });

    return this;
  }

  user(value = null) {
    if (value === null) {
      return this._user;
    }

    this._user = value;
    this._authorize();

    return this;
  }

  order(element = null, value = -1) {
    if (element !== null) {
      this._move(element, value);
    }

    this._order();
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
    this._root.style('border-color', () => {
      return value === true ? 'transparent' : '#CCC';
    });

    return this;
  }

  _bindRoot() {
    this._root.on('click.scola-item', this._handleClick);
  }

  _unbindRoot() {
    this._root.on('click.scola-item', null);
  }

  _bindModel() {
    if (this._model) {
      this._model.setMaxListeners(this._model.getMaxListeners() + 1);
      this._model.addListener('set', this._handleSet);
    }
  }

  _unbindModel() {
    if (this._model) {
      this._model.setMaxListeners(this._model.getMaxListeners() - 1);
      this._model.removeListener('set', this._handleSet);
    }
  }

  _add(element) {
    this._elements.push(element);
    this._order();
  }

  _move(element, value) {
    this._elements.splice(value, 0,
      this._elements.splice(
        this._elements.indexOf(element), 1).pop());
  }

  _order() {
    this._elements.forEach((element, index) => {
      element.order(index + 2, false);
      this._root.node().appendChild(element.root().node());
    });
  }

  _click() {}

  _authorize() {}

  _set() {}
}
