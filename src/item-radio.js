import isEqual from 'lodash-es/isEqual';
import Item from './item';

export default class RadioItem extends Item {
  constructor() {
    super();

    this._root
      .classed('radio', true)
      .styles({
        'cursor': 'pointer'
      });

    this._check = this
      .icon()
      .secondary()
      .show(false);

    this._check
      .root()
      .styles({
        'color': '#000'
      });

    this._check
      .icon()
      .classed('ion-ios-checkmark-empty', true)
      .styles({
        'font-size': '1.9em'
      });
  }

  selected(value = null) {
    if (value === null) {
      value = this._model.get(this._name);
    }

    value = this._format(value);
    const self = this._format(this._value);

    return typeof value !== 'undefined' &&
      isEqual(value, self);
  }

  _add(element) {
    this._parts.splice(-1, 0, element);
    this._order();
  }

  _click() {
    if (this._model) {
      this._model.set(this._name, this._value);
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    this._check.show(this.selected(setEvent.value));
  }
}
