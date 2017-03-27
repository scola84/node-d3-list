import Item from './item';

export default class CheckItem extends Item {
  constructor() {
    super();

    this._root
      .classed('check', true)
      .styles({
        'cursor': 'pointer'
      });

    this._check = this
      .icon()
      .class('ion-ios-circle-outline')
      .size('1.5em');

    this._check
      .root()
      .styles({
        'width': '1.75em'
      });
  }

  _click() {
    const cancel =
      this._model === null ||
      this._disabled === true;

    if (cancel === true) {
      return;
    }

    const value = this._model.get(this._name);
    const action = typeof value === 'undefined' ||
      value.indexOf(this._value) === -1;

    this._model.add(this._name, this._value, action);
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = setEvent.value;
    const checked = typeof value !== 'undefined' &&
      value.indexOf(this._value) > -1;

    if (checked === true) {
      this._check.class('ion-ios-circle-outline');
    } else {
      this._check.class('ion-ios-checkmark');
    }
  }
}
