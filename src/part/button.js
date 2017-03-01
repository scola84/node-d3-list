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
        'border': 0,
        'color': 'inherit',
        'cursor': 'pointer',
        'display': 'flex',
        'font-size': '2em',
        'margin': 0,
        'padding': 0
      });

    this.padding(true);
    this.primary();
    this.show();
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
