import isEqual from 'lodash-es/isEqual';
import Item from './item';

export default class MenuItem extends Item {
  constructor() {
    super();

    this._root
      .classed('menu', true)
      .styles({
        'cursor': 'pointer'
      });
  }

  selected(value = null) {
    if (value === null) {
      value = this._model.get(this._name);
    }

    value = this._format(value);
    const self = this._format(this._value);

    let selected = typeof value !== 'undefined' &&
      isEqual(value, self);

    if (typeof value === 'string') {
      selected = value.indexOf(self) !== -1;
    }

    return selected;
  }

  _click() {
    if (this._disabled === false && this._model) {
      this._model.set(this._name, this._value);
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    if (this.selected(setEvent.value) === true) {
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
