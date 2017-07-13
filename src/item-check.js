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
      .icon();

    this._check
      .root()
      .styles({
        'width': '1.75em'
      });

    this._check
      .icon()
      .classed('ion-ios-circle-outline', true)
      .styles({
        'font-size': '1.5em'
      });
  }

  selected(value = null) {
    if (value === null) {
      value = this._model.get(this._name);
    }

    return typeof value !== 'undefined' &&
      value.indexOf(this._value) > -1;
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

    this._check
      .icon()
      .attr('class', () => {
        return this.selected(setEvent.value) === true ?
          'ion-ios-checkmark' :
          'ion-ios-circle-outline';
      });
  }
}
