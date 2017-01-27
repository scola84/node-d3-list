import { select } from 'd3-selection';
import Part from '../part';
import 'd3-selection-multi';

export default class Icon extends Part {
  constructor() {
    super();

    this._class = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola icon', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'display': 'flex',
        'padding': '0.5em 0'
      });

    this._icon = this._root
      .append('div')
      .styles({
        'display': 'flex',
        'font-size': '2em'
      });

    this._padding = this._root
      .append('div')
      .styles({
        'width': '1em'
      });

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

  show(action = true) {
    this._root.style('display', () => {
      return action ? 'flex' : 'none';
    });
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
