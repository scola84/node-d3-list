export default class Part {
  constructor() {
    this._item = null;
    this._root = null;
    this._model = null;
    this._format = null;

    this._handleSet = (e) => this._set(e);
  }

  destroy() {
    this._unbindModel();
    this._model = null;
    this._format = null;

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  item(value = null) {
    if (value === null) {
      return this._item;
    }

    this._item = value;
    return this;
  }

  name(value) {
    if (value === null) {
      return this._name;
    }

    this._name = value;
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

  order(value = null, update = true) {
    if (value === null) {
      return this._root.style('order');
    }

    this._root.style('order', value);

    if (update === true) {
      this._item.order(this, value);
    }

    return this;
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

  _set() {}
}
