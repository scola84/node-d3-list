import Item from './item';

export default class MenuItem extends Item {
  constructor() {
    super();

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

  value(value) {
    this._value = value;
    return this;
  }

  _bind() {
    this._root.on('click.scola-menu-item', () => this._handleClick());
  }

  _unbind() {
    this._root.on('click.scola-menu-item', null);
  }

  _handleClick() {
    this._model.set(this._name, this._value);
  }

  _modelChange() {
    if (this._model.get(this._name) === this._value) {
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
