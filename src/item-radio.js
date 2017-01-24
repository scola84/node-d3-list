import isEqual from 'lodash-es/isEqual';
import Item from './item';

export default class RadioItem extends Item {
  constructor() {
    super();

    this._root
      .classed('radio', true)
      .style('cursor', 'pointer');

    this._check = this
      .icon()
      .class('ion-ios-checkmark-empty')
      .secondary();

    this._check
      .root()
      .style('color', '#000');
  }

  _add(element) {
    this._elements.splice(-1, 0, element);
  }

  _click() {
    this._model.set(this._name, this._value);
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    this._check.show(isEqual(value, this._value));
  }
}
