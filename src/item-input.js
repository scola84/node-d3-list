import Input from './part/input';
import Item from './item';

export default class InputItem extends Item {
  constructor() {
    super();

    this._input = null;
    this._root.classed('input', true);

    this._handleChange = () => this._change();
  }

  destroy() {
    this._unbindInput();
    super.destroy();
  }

  input(value = null) {
    this._input = new Input()
      .item(this)
      .name(this._name);

    this._input.type(value);
    this._add(this._input);
    this._order();

    this._bindInput();
    this.model(this._model, this._format);

    return this._input;
  }

  _bindInput() {
    this._input.root().on('input', () => this._handleChange());
  }

  _unbindInput() {
    this._input.root().on('input', null);
  }

  _change() {
    this._model.set(this._name, this._input.value());
  }

  _set(setEvent) {
    if (!this._input || setEvent.name !== this._name) {
      return;
    }

    this._input.value(this._format(setEvent.value));
  }
}
