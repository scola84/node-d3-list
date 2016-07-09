import { event } from 'd3-selection';
import StaticList from './list-static';

export default class SelectList extends StaticList {
  constructor() {
    super();
    this._selected = null;

    this._root
      .classed('static', false)
      .classed('select', true);
  }

  destroy() {
    this._items.forEach((item) => this._unbindItem(item));
    super.destroy();
  }

  append(item, action = true) {
    if (action === true) {
      this._bindItem(item);
    } else {
      this._unbindItem(item);
    }

    return super.append(item, action);
  }

  value() {
    return this._selected ? this._selected.value() : null;
  }

  _bindItem(item) {
    item.root().on('select.scola-select-list', this._handleSelect.bind(this));
  }

  _unbindItem(item) {
    item.root().on('select.scola-select-list', null);
  }

  _handleSelect() {
    if (event.detail.item.selected() === false) {
      if (event.detail.item === this._selected) {
        this._selected = null;
      }

      return;
    }

    if (event.detail.item === this._selected) {
      return;
    }

    if (this._selected) {
      this._selected.selected(false);
    }

    this._selected = event.detail.item;

    this._root.dispatch('select', {
      detail: {
        item: this._selected,
        list: this
      }
    });
  }
}
