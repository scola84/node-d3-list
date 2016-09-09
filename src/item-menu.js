import Item from './item';

export default class MenuItem extends Item {
  constructor() {
    super();

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

  value(itemValue) {
    if (typeof itemValue === 'undefined') {
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

  _handleClick() {
    this._model
      .set(this._name, this._value)
      .commit();
  }

  _modelSet(event) {
    if (event.name !== this._name) {
      return;
    }

    const value = this._format(event.value);

    if (value === this._value) {
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
