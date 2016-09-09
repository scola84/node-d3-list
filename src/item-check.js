import Item from './item';

export default class CheckItem extends Item {
  constructor() {
    super();

    this._root
      .classed('plain', false)
      .classed('radio', true)
      .style('cursor', 'pointer');

    this.primary().icon('ion-ios-circle-outline', '1.5em');

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
    this._root.on('click.scola-check-item', () => this._handleClick());
  }

  _unbind() {
    this._root.on('click.scola-check-item', null);
  }

  _handleClick() {
    const value = this._model.get(this._name);
    const action = !value || value.indexOf(this._value) === -1;

    this._model.add(this._name, this._value, action);
  }

  _modelSet(event) {
    if (event.name !== this._name) {
      return;
    }

    const value = this._format(event.value);

    if (!value || value.indexOf(this._value) === -1) {
      this.primary().icon('ion-ios-circle-outline');
    } else {
      this.primary().icon('ion-ios-checkmark');
    }
  }
}
