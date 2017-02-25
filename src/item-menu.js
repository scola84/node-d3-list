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

  _click() {
    if (this._model) {
      this._model.set(this._name, this._value);
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    let selected = typeof value !== 'undefined' &&
      isEqual(value, this._value);

    if (typeof value === 'string') {
      selected = value.indexOf(this._value) !== -1;
    }

    if (selected) {
      this._root
        .classed('selected', true)
        .style('background', '#007AFF');
    } else {
      this._root
        .classed('selected', false)
        .style('background', '#FFF');
    }

    this._root.dispatch('select', {
      detail: { selected }
    });
  }
}
