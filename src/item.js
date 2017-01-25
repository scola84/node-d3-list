import { select } from 'd3-selection';
import Button from './part/button';
import Icon from './part/icon';
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
        'flex-direction': 'row',
        'line-height': '3em'
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

    this._model = null;

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  first(value = null) {
    if (value === null) {
      return this._first;
    }

    this._first = value;
    this._root.style('border-color',
      value === true ? 'transparent' : '#CCC');

    return this;
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
    this._order();

    return button;
  }

  icon(value = null) {
    const icon = new Icon()
      .item(this);

    icon.class(value);
    this._add(icon);
    this._order();

    return icon;
  }

  text(value = null) {
    const text = new Text()
      .item(this);

    text.text(value);
    this._add(text);
    this._order();

    return text;
  }

  _bindRoot() {
    this._root.on('click', this._handleClick);
  }

  _unbindRoot() {
    this._root.on('click', null);
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

  _authorize() {}

  _click() {}

  _set() {}
}
