import Item from './item';
import Knob from './part/knob';
import 'd3-selection-multi';

export default class SwitchItem extends Item {
  constructor() {
    super();

    this._knob = null;
    this._root.classed('switch', true);

    this._unbindRoot();
  }

  destroy() {
    this._unbindKnob();
    super.destroy();
  }

  knob() {
    this._knob = new Knob()
      .item(this);

    this._add(this._knob);
    this._order();

    this._bindKnob();
    this.model(this._model, this._format);

    return this._knob;
  }

  _bindKnob() {
    this._knob
      .knob()
      .on('click.scola-item-switch', () => this._handleClick());
  }

  _unbindKnob() {
    this._knob
      .knob()
      .on('click.scola-item-switch', null);
  }

  _handleClick() {
    this._model.set(this._name, !this._model.get(this._name));
  }

  _set(setEvent) {
    if (!this._knob || setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    this._knob.value(value);
  }
}
