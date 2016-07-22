import { event, select } from 'd3-selection';

export default class Filter {
  constructor() {
    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola filter', true)
      .styles({
        'background': '#CCC',
        'padding': '0.5em'
      });

    this._inner = this._root
      .append('div')
      .classed('scola inner', true)
      .styles({
        'background': '#FFF',
        'border-radius': '0.5em',
        'display': 'flex',
        'flex-direction': 'row'
      });

    this._icon = this._inner
      .append('div')
      .classed('scola icon', true)
      .styles({
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'order': 1,
        'width': '2em',
        'height': '2em'
      });

    this._iconInner = this._icon
      .append('div')
      .classed('ion-ios-search', true)
      .styles({
        'color': '#AAA',
        'font-size': '1.25em'
      });

    this._input = this._inner
      .append('input')
      .classed('scola input', true)
      .attr('type', 'search')
      .styles({
        'background': 'none',
        'border': 0,
        'color': 'inherit',
        'flex': 1,
        'height': '2em',
        'order': 2
      });

    this._clear = this._inner
      .append('div')
      .classed('scola clear', true)
      .styles({
        'display': 'none',
        'align-items': 'center',
        'justify-content': 'center',
        'order': 3,
        'width': '2em',
        'height': '2em'
      });

    this._clearInner = this._clear
      .append('div')
      .classed('ion-close-circled', true)
      .styles({
        'color': '#AAA',
        'font-size': '1.25em',
        'cursor': 'pointer'
      });

    this._bind();
  }

  _bind() {
    this._input.on('keyup.scola-filter', () => this._handleInput());
    this._clear.on('click.scola-filter', () => this._handleClear());
  }

  _unbind() {
    this._input.on('input.scola-filter', null);
    this._clear.on('click.scola-filter', null);
  }

  destroy() {
    this._unbind();
    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  input() {
    return this._input;
  }

  root() {
    return this._root;
  }

  placeholder(placeholder) {
    this._input.attr('placeholder', placeholder);
    return this;
  }

  value(value) {
    if (typeof value === 'undefined') {
      return this._input.property('value').trim();
    }

    this._input.property('value', value);
    this._value();

    return this;
  }

  _handleInput() {
    if (event.keyCode !== 13 && event.keyCode !== 27) {
      return;
    }

    this._value();
  }

  _handleClear() {
    const value = '';

    this._input.property('value', value);
    this._clear.style('display', 'none');

    this._root.dispatch('filter', {
      detail: value
    });
  }

  _value() {
    const value = this.value();

    if (value.length === 0) {
      this._handleClear();
      return;
    }

    this._clear.style('display', 'flex');

    this._root.dispatch('filter', {
      detail: value
    });
  }
}
