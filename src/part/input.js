import { event, select } from 'd3';
import Part from '../part';

export default class Input extends Part {
  constructor() {
    super();

    this._capsKey = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola input', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': '1 1 0%',
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

  focus() {
    this._input.node().focus();
    return this;
  }

  _bindInput() {
    this._input.on('input.scola-list', () => this._change());
    this._input.on('keydown.scola-list', () => this._keydown(event));
    this._input.on('keypress.scola-list', () => this._keypress(event));
  }

  _unbindInput() {
    this._input.on('input.scola-list', null);
    this._input.on('keydown.scola-list', null);
    this._input.on('keypress.scola-list', null);
  }

  _keydown(keyEvent) {
    const keyCode = keyEvent.which || keyEvent.keyCode || 0;

    if (keyCode === 20) {
      if (this._capsKey === null) {
        return;
      }

      this._capsKey = !this._capsKey;

      this._input.dispatch('caps', {
        detail: this._capsKey
      });
    }
  }

  _keypress(keyEvent) {
    const keyCode = keyEvent.which || keyEvent.keyCode || 0;
    const string = String.fromCharCode(keyCode);

    if (keyEvent.shiftKey === false) {
      this._capsKey =
        string.toUpperCase() === string &&
        string.toLowerCase() !== string;
    } else {
      this._capsKey =
        string.toLowerCase() === string &&
        string.toUpperCase() !== string;
    }

    this._input.dispatch('caps', {
      detail: this._capsKey
    });
  }

  _change() {
    if (this._model) {
      const value = this._input.property('value');
      this._model.set(this._name, value);
    }
  }

  _set(setEvent) {
    const cancel =
      setEvent.name !== this._name ||
      setEvent.value === this._input.property('value');

    if (cancel === true) {
      return;
    }

    const value = this._format(setEvent.value);
    this._input.property('value', value);
  }
}
