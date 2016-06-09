import StaticList from './list-static';

export default class SelectList extends StaticList {
  constructor() {
    super();
    this._selected = null;
  }

  destroy() {
    this._items.forEach((item) => {
      item.outer().on('.list-select', null);
    });

    super.destroy();
  }

  append(item) {
    item.outer().on('select.list-select', this._handleSelect.bind(this));
    super.append(item);
  }

  value() {
    return this._selected ? this._selected.value() : null;
  }

  _handleSelect() {
    if (this._selected === event.detail.item) {
      return;
    }

    if (this._selected) {
      this._selected.select(false);
    }

    this._selected = event.detail.item;

    this._outer.dispatch('select', {
      detail: {
        value: this._selected.value()
      }
    });
  }
}
