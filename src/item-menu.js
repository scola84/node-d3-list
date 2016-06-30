import { event } from 'd3-selection';
import PlainItem from './item-plain';

export default class MenuItem extends PlainItem {
  constructor() {
    super();

    this._selected = false;
    this._value = null;

    this._root
      .classed('plain', false)
      .classed('menu', true)
      .style('cursor', 'pointer');

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  selected(selected) {
    if (typeof selected === 'undefined') {
      return this._selected;
    }

    this._selected = selected;

    this._root.dispatch('select', {
      detail: {
        item: this
      }
    });

    return this;
  }

  value(value) {
    if (typeof value === 'undefined') {
      return this._value;
    }

    this._value = value;
    return this;
  }

  _bind() {
    this._root.on('click.scola-menu-item', this._handleClick.bind(this));
    this._root.on('select.scola-menu-item', this._handleSelect.bind(this));
  }

  _unbind() {
    this._root.on('click.scola-menu-item', null);
    this._root.on('select.scola-menu-item', null);
  }

  _handleClick() {
    if (this._selected) {
      return;
    }

    this.selected(true);
  }

  _handleSelect() {
    if (event.detail.item.selected()) {
      this._select();
    } else {
      this._deselect();
    }
  }

  _select() {
    this._root
      .classed('selected', true)
      .style('background', 'rgb(0, 122, 255)');

    this._label.style('color', '#FFF');

    if (this._sub) {
      this._sub.style('color', '#FFF');
    }
  }

  _deselect() {
    this._root
      .classed('selected', false)
      .style('background', '#FFF');

    this._label.style('color', 'initial');

    if (this._sub) {
      this._sub.style('color', '#AAA');
    }
  }
}
