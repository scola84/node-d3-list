import Item from './item';

export default class RadioItem extends Item {
  constructor() {
    super();

    this._root
      .classed('radio', true)
      .style('cursor', 'pointer');

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  value(itemValue) {
    this._value = itemValue;
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

  _modelSet(event) {
    if (event.name !== this._name) {
      return;
    }

    if (event.value === this._value) {
      this.secondary().icon('ion-ios-checkmark-empty');
      this.secondary().icon().style('color', '#000');
    } else {
      this.secondary().icon(false);
    }
  }
}
