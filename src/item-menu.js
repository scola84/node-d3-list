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
      .style('cursor', 'pointer')
      .on('click.item-menu', this._handleClick.bind(this))
      .on('select.item-menu', this._handleSelect.bind(this));
  }

  destroy() {
    this._root.on('click.item-menu', null);
    this._root.on('select.item-menu', null);
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

  _handleClick() {
    if (this._selected) {
      return;
    }

    this.selected(true);
  }

  _handleSelect() {
    if (event.detail.item.selected()) {
      this._root.classed('selected', true);
      this._root.style('background', 'rgb(0, 122, 255)');
      this._label.style('color', '#FFF');
      this._sub.style('color', '#FFF');
    } else {
      this._root.classed('selected', false);
      this._root.style('background', '#FFF');
      this._label.style('color', 'initial');
      this._sub.style('color', '#AAA');
    }
  }
}
