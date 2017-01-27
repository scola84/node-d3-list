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
        'align-items': 'center',
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'overflow': 'hidden',
        'padding': '0.5em 0'
      });

    this._text = this._root
      .append('button')
      .attr('type', 'button')
      .attr('tabindex', -1)
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'cursor': 'pointer',
        'height': '2em',
        'max-width': '100%',
        'overflow': 'hidden',
        'padding': '0 0.125em',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._padding = this._root
      .append('div')
      .styles({
        'width': '1em'
      });

    this.primary();
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

  tabindex(value = null) {
    if (value === null) {
      return this._text.attr('tabindex');
    }

    this._text.attr('tabindex', value);
    return this;
  }

  text(value) {
    if (value === null) {
      return this._text.text();
    }

    this._text.text(value);
    return this;
  }

  primary(flex = true) {
    this._root.styles({
      'color': '#000',
      'flex': flex ? 1 : 'none',
      'justify-content': 'flex-start'
    });

    return this;
  }

  secondary(flex = true) {
    this._root.styles({
      'color': '#AAA',
      'flex': flex ? 1 : 'none',
      'justify-content': 'flex-end'
    });

    this._text.style('padding', 0);
    return this;
  }
}
