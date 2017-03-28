import { select } from 'd3';
import Part from '../part';

export default class Button extends Part {
  constructor() {
    super();

    this._class = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola button', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'display': 'flex',
        'height': '3em',
        'padding': '0.5em 0'
      });

    this._icon = this._root
      .append('button')
      .styles({
        'background': 'none',
        'border': '1px solid transparent',
        'color': 'inherit',
        'cursor': 'pointer',
        'display': 'flex',
        'font-size': '2em',
        'margin': 0,
        'padding': 0
      });

    this.padding(true);
    this.primary();
    this.show(true);
  }

  icon() {
    return this._icon;
  }

  class(value = null) {
    if (value === null) {
      return this._icon.classed();
    }

    if (this._class) {
      this._icon.classed(this._class, false);
    }

    this._class = value;
    this._icon.classed(value, true);

    return this;
  }

  disabled(value = null) {
    if (value !== null) {
      this._icon.property('disabled', value);
    }

    return super.disabled(value);
  }

  size(value = null) {
    if (value === null) {
      return this._icon.style('font-size');
    }

    this._icon.style('font-size', value);
    return this;
  }

  tabindex(value = null) {
    if (value === null) {
      return this._icon.attr('tabindex');
    }

    this._icon.attr('tabindex', value);
    return this;
  }

  circle(background = '#007AFF') {
    this._icon.styles({
      background,
      'border-radius': '1em',
      'color': '#FFF',
      'height': '1em',
      'width': '1em'
    });

    return this;
  }

  primary() {
    this._root.styles({
      'border-top-color': 'transparent',
      'color': '#000',
      'padding-right': 0,
      'width': '2.25em'
    });

    return this;
  }

  secondary() {
    this._root.styles({
      'border-top-color': 'inherit',
      'color': '#BBB',
      'width': 'auto'
    });

    return this;
  }
}
