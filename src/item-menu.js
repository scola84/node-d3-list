import Item from './item';

export default class MenuItem extends Item {
  constructor() {
    super();

    this._user = null;
    this._value = null;

    this._root
      .classed('menu', true)
      .style('cursor', 'pointer');

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  user(value = null) {
    if (value === null) {
      return this._user;
    }

    this._user = value;
    return this._handleUser();
  }

  value(itemValue = null) {
    if (itemValue === null) {
      return this._value;
    }

    this._value = itemValue;
    return this;
  }

  _bind() {
    this._root.on('click.scola-menu-item', () => this._handleClick());
  }

  _unbind() {
    this._root.on('click.scola-menu-item', null);
  }

  _path() {
    return [this._value, this._name].join('@');
  }

  _handleClick() {
    if (!this._user || this._user.may('GET', this._path())) {
      this._model.set(this._name, this._value);
    }
  }

  _handleUser() {
    if (this._user.may('GET', this._path())) {
      return this;
    }

    this._root
      .classed('disabled', true)
      .style('cursor', 'default');

    this.secondary().button(false);
    return this;
  }

  _modelSet(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);

    if (value && value.indexOf(this._value) !== -1) {
      this._root
        .classed('selected', true)
        .style('background', '#007AFF');
    } else {
      this._root
        .classed('selected', false)
        .style('background', '#FFF');
    }
  }
}
