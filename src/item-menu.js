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

  _authorize() {
    if (this._user.may('GET', this._path())) {
      return;
    }

    this._root
      .classed('disabled', true)
      .style('cursor', 'default');
  }

  _handleClick() {
    if (!this._user || this._user.may('GET', this._path())) {
      this._model.set(this._name, this._value);
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);

    if (value && value.indexOf(this._value) !== -1) {
      this._root
        .classed('selected', true)
        .style('background', '#007AFF');
    } else {
      this._root
        .classed('selected', false)
        .style('background', '#FFF');
    }
  }

  _path() {
    return [this._value, this._name].join('@');
  }
}
