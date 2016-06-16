import StaticList from './list-static';

export default class SelectList extends StaticList {
  constructor() {
    super();
    this._selected = null;
  }

  destroy() {
    this._items.forEach((item) => {
      item.root().on('.list-select', null);
    });

    super.destroy();
  }

  append(item) {
    item.root().on('select.list-select', this._handleSelect.bind(this));
    super.append(item);

    return this;
  }

  value() {
    return this._selected ? this._selected.value() : null;
  }

  _handleSelect() {
    if (this._selected === event.detail.item) {
      return;
    }

    if (this._selected) {
      this._selected.selected(false);
    }

    this._selected = event.detail.item;

    this._root.dispatch('select', {
      detail: {
        item: this._selected
      }
    });
  }
}
