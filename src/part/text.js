import { select } from 'd3';
import Part from '../part';

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
        'min-height': '3em',
        'overflow': 'hidden',
        'padding': '0.5em 0'
      });

    this._wrapper = this._root
      .append('div')
      .styles({
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'min-width': 0
      });

    this._label = this._wrapper
      .append('div')
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.8em',
        'padding': '0 0.25em 0.25em'
      });

    this._text = this._wrapper
      .append('button')
      .attrs({
        'tabindex': -1,
        'type': 'button'
      })
      .styles({
        'background': 'none',
        'border': '1px solid transparent',
        'color': 'inherit',
        'cursor': 'inherit',
        'line-height': '1.5em',
        'max-width': '100%',
        'overflow': 'hidden',
        'padding': '0 0.125em',
        'text-align': 'left',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this.padding(true);
    this.primary();
  }

  label(value = null) {
    if (value === null) {
      return this._label;
    }

    this._label
      .style('display', 'initial')
      .text(value);

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
      return this._text;
    }

    this._text.text(value);
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

  primary(flex = true) {
    this._root.styles({
      'color': '#000',
      'flex': flex === true ? 'auto' : 'none',
      'justify-content': 'flex-start'
    });

    this._wrapper.styles({
      'flex': flex === true ? 'auto' : 'none'
    });

    return this;
  }

  secondary(flex = false) {
    this._root.styles({
      'color': '#AAA',
      'flex': flex === true ? 'auto' : 'none',
      'justify-content': 'flex-end'
    });

    this._wrapper.styles({
      'flex': flex === true ? 'auto' : 'none'
    });

    this._text.styles({
      'padding': 0
    });

    return this;
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    this._text.text(value);
  }
}
