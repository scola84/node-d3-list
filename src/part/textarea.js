import { select } from 'd3';
import Part from '../part';

export default class Textarea extends Part {
  constructor() {
    super();

    this._capsKey = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola textarea', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': '1 1 0%',
        'min-height': '3em',
        'padding': '0.5em 0'
      });

    this._textarea = this._root
      .append('textarea')
      .attrs({
        'cols': 1,
        'rows': 1
      })
      .styles({
        'background': '#FFF',
        'border': '0',
        'border-radius': '0.5em',
        'color': 'inherit',
        'line-height': '1.5em',
        'margin': 0,
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        'padding': '0.25em 0.35em',
        'resize': 'none',
        'width': '100%',
      });

    this.padding(true);
    this._bindTextarea();
  }

  destroy() {
    this._unbindTextarea();
    super.destroy();
  }

  textarea() {
    return this._textarea;
  }

  disabled(value = null) {
    if (value !== null) {
      this._textarea.property('disabled', value);
    }

    return super.disabled(value);
  }

  lines(value = null) {
    if (value === null) {
      return this._textarea.attr('rows');
    }

    this._textarea.attr('rows', value);
    return this;
  }

  name(value = null) {
    if (value !== null) {
      this._textarea.attr('name', value);
    }

    return super.name(value);
  }

  placeholder(value = null) {
    if (value === null) {
      return this._textarea.attr('placeholder');
    }

    this._textarea.attr('placeholder', value);
    return this;
  }

  tabindex(value = null) {
    if (value === null) {
      return this._textarea.attr('tabindex');
    }

    this._textarea.attr('tabindex', value);
    return this;
  }

  focus() {
    this._textarea.node().focus();
    return this;
  }

  _bindTextarea() {
    this._textarea.on('input.scola-list', () => this._change());
  }

  _unbindTextarea() {
    this._textarea.on('input.scola-list', null);
  }

  _change() {
    if (this._model) {
      const value = this._textarea.property('value');
      this._model.set(this._name, value);
    }
  }

  _set(setEvent) {
    const cancel =
      setEvent.name !== this._name ||
      setEvent.value === this._textarea.property('value');

    if (cancel === true) {
      return;
    }

    const value = this._format(setEvent.value);
    this._textarea.property('value', value);
  }
}
