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
        'min-height': '3em',
        'padding': '0.5em 0'
      });

    this._wrapper = this._root
      .append('div')
      .styles({
        'align-items': 'center',
        'display': 'flex',
        'flex': '1 1 auto',
        'flex-direction': 'column',
        'justify-content': 'center'
      });

    this._button = this._wrapper
      .append('button')
      .styles({
        'align-items': 'center',
        'background': 'none',
        'border': '1px solid transparent',
        'color': 'inherit',
        'cursor': 'pointer',
        'display': 'flex',
        'font-size': '2em',
        'justify-content': 'center',
        'margin': 0,
        'padding': 0
      });

    this._icon = this._button
      .append('span')
      .styles({
        'font-size': '1em',
        'line-height': 0,
        'position': 'relative'
      });

    this._sub = this._wrapper
      .append('div')
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.8em',
        'padding': '0.25em 0.25em 0'
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
      this._button.property('disabled', value);
    }

    return super.disabled(value);
  }

  sub(value = null) {
    if (value === null) {
      return this._sub;
    }

    this._sub
      .style('display', null)
      .text(value);

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
      return this._button.attr('tabindex');
    }

    this._button.attr('tabindex', value);
    return this;
  }

  width(value = null) {
    if (value === null) {
      return this._root.style('width');
    }

    this._root.styles({
      'flex': 'none',
      'width': value
    });

    return this;
  }

  circle(background = '#007AFF') {
    this._root.classed('circle', true);

    this._button.styles({
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
