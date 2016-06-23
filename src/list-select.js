import { event } from 'd3-selection';
import StaticList from './list-static';

export default class SelectList extends StaticList {
  constructor() {
    super();
    this._selected = null;
  }

  destroy() {
    this._items.forEach((item) => {
      item.root().on('select.list-select', null);
    });

    super.destroy();
  }

  append(item, action = true) {
    if (action === true) {
      item.root().on('select.list-select', this._handleSelect.bind(this));
    } else {
      item.root().on('select.list-select', null);
    }

    return super.append(item, action);
  }

  value() {
    return this._selected ? this._selected.value() : null;
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
