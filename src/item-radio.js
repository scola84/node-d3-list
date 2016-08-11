import Item from './item';

export default class RadioItem extends Item {
  constructor() {
    super();

    this._root
      .classed('plain', false)
      .classed('radio', true)
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
    this._root.on('click.scola-select-item', () => this._handleClick());
  }

  _unbind() {
    this._root.on('click.scola-select-item', null);
  }

  _handleClick() {
    this._model.set(this._name, this._value);
  }

  _modelChange() {
    if (this._model.get(this._name) === this._value) {
      this.secondary().icon('ion-ios-checkmark-empty');
      this.secondary().icon().style('color', '#000');
    } else {
      this.secondary().icon(false);
    }
  }
}
