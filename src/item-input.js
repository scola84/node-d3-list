import Item from './item';

export default class InputItem extends Item {
  constructor() {
    super();

    this._root.classed('input', true);

    this._inputRoot = this._root
      .append('div')
      .classed('scola input-root', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'order': 5,
        'flex': 1
      });

    this._input = this._inputRoot
      .append('input')
      .classed('scola input', true)
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'height': '3em',
        'padding': 0,
        'width': '100%'
      });

    this._inputPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 6,
        'width': '1em'
      });

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  name(itemName) {
    this._input.attr('name', itemName);
    return super.name(itemName);
  }

  input() {
    return this._input;
  }

  _bind() {
    this._input.on('input.scola-input-item', () => this._handleInput());
  }

  _unbind() {
    this._input.on('input.scola-input-item', null);
  }

  _handleInput() {
    this._model.set(this._name, this._input.property('value'));
  }

  _modelSet(event) {
    if (event.name !== this._name) {
      return;
    }

    this._input.property('value', event.value);
  }
}
