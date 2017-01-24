import { select } from 'd3-selection';
import Part from '../part';
import 'd3-selection-multi';

export default class Text extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola text', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    this._text = this._root
      .append('div')
      .styles({
        'flex': 1,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
      });

    this._padding = this._root
      .append('div')
      .style('width', '1em');

    this.primary();
  }

  text(value) {
    if (value === null) {
      return this._text.text();
    }

    this._text.text(value);
    return this;
  }

  size(value = null) {
    if (value === null) {
      return this._root.style('width');
    }

    this._root.styles({
      'flex': 'none',
      'width': value
    });

    return this;
  }

  primary(flex = true) {
    this._root.styles({
      'color': '#000',
      'flex': flex ? 1 : 'none',
      'text-align': 'start'
    });

    return this;
  }

  secondary(flex = true) {
    this._root.styles({
      'color': '#BBB',
      'flex': flex ? 1 : 'none',
      'text-align': 'end'
    });

    return this;
  }
}
