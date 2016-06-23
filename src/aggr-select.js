import { event } from 'd3-selection';

export default class SelectAggregate {
  constructor() {
    this._lists = new Set();
    this._list = null;
    this._item = null;
  }

  destroy() {
    this._lists.forEach((list) => {
      this._unbindList(list);
    });

    this._lists.clear();
  }

  append(list, action = true) {
    if (action === true) {
      this._lists.add(list);
      this._bindList(list);
    } else if (action === false) {
      this._lists.remove(list);
      this._unbindList(list);
    }

    return this;
  }

  _bindList(list) {
    list.root().on('select.scola-aggr-select',
      this._handleSelect.bind(this));
  }

  _unbindList(list) {
    list.root().on('select.scola-aggr-select', null);
  }

  _handleSelect() {
    if (event.detail.list !== this._list && this._item) {
      this._item.selected(false);
    }

    this._list = event.detail.list;
    this._item = event.detail.item;
  }
}
