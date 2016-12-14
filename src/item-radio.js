import isEqual from 'lodash-es/isEqual';
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

  _modelSet(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);

    if (isEqual(value, this._value)) {
      this.secondary().button('ion-ios-checkmark-empty');
      this.secondary().button().style('color', '#000');
    } else {
      this.secondary().button(false);
    }
  }
}
