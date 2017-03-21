import { select } from 'd3';
import Part from '../part';

export default class Input extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola input', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': 1,
        'height': '3em',
        'padding': '0.5em 0'
      });

    this._input = this._root
      .append('input')
      .attr('type', 'text')
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'padding': '0.125em',
        'width': '100%'
      });

    this.padding(true);
    this._bindInput();
  }

  destroy() {
    this._unbindInput();
    super.destroy();
  }

  input() {
    return this._input;
  }

  disabled(value = null) {
    if (value !== null) {
      this._input.property('disabled', value);
    }

    return super.disabled(value);
  }

  name(value = null) {
    if (value !== null) {
      this._input.attr('name', value);
    }

    return super.name(value);
  }

  placeholder(value = null) {
    if (value === null) {
      return this._input.attr('placeholder');
    }

    this._input.attr('placeholder', value);
    return this;
  }

  tabindex(value = null) {
    if (value === null) {
      return this._input.attr('tabindex');
    }

    this._input.attr('tabindex', value);
    return this;
  }

  type(value = null) {
    if (value === null) {
      return this._input.attr('type');
    }

    this._input.attr('type', value);
    return this;
  }

  _bindInput() {
    this._input.on('input.scola-list', () => this._change());
  }

  _unbindInput() {
    this._input.on('input.scola-list', null);
  }

  _change() {
    if (this._model) {
      const value = this._input.property('value');
      this._model.set(this._name, value);
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    this._input.property('value', value);
  }
}
