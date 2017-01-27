import { select } from 'd3-selection';
import Part from '../part';
import 'd3-selection-multi';

export default class Input extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola input-root', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': 1,
        'padding': '0.5em 0'
      });

    this._input = this._root
      .append('input')
      .attr('type', 'text')
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'height': '2em',
        'padding': '0.125em',
        'width': '100%'
      });

    this._padding = this._root
      .append('div')
      .styles({
        'width': '1em'
      });
  }

  input() {
    return this._input;
  }

  name(value = null) {
    if (value === null) {
      return this._input.attr('name');
    }

    this._input.attr('name', value);
    return this;
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

  value(inputValue = null) {
    if (inputValue === null) {
      return this._input.property('value');
    }

    this._input.property('value', inputValue);
    return this;
  }
}
