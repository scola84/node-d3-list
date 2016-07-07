import { event, select } from 'd3-selection';

export default class Filter {
  constructor() {
    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola filter', true)
      .styles({
        'align-items': 'center',
        'background': '#CCC',
        'display': 'flex',
        'height': '3em',
        'padding': '0 0.5em'
      });

    this._search = this._root
      .append('div')
      .classed('ion-ios-search', true)
      .styles({
        'color': '#AAA',
        'left': '0.8em',
        'top': '0.75em',
        'font-size': '1.25em',
        'cursor': 'pointer',
        'position': 'absolute'
      });

    this._input = this._root
      .append('input')
      .attr('type', 'search')
      .styles({
        'background': '#FFF',
        'border': 0,
        'border-radius': '0.5em',
        'color': 'inherit',
        'flex': 1,
        'height': '2em',
        'padding': '0 2em'
      });

    this._clear = this._root
      .append('div')
      .classed('ion-close-circled', true)
      .styles({
        'color': '#AAA',
        'display': 'none',
        'right': '0.8em',
        'top': '0.75em',
        'font-size': '1.25em',
        'cursor': 'pointer',
        'position': 'absolute'
      });

    this._bind();
  }

  _bind() {
    this._input.on('keyup', this._handleInput.bind(this));
    this._clear.on('click', this._handleClear.bind(this));
  }

  _unbind() {
    this._input.on('input', null);
    this._clear.on('click', null);
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

  value() {
    return this._input.property('value').trim();
  }

  _handleInput() {
    if (event.keyCode !== 13 && event.keyCode !== 27) {
      return;
    }

    const value = this.value();

    if (value.length === 0) {
      this._handleClear();
      return;
    }

    this._clear.style('display', 'inline');

    this._root.dispatch('filter', {
      detail: value.split(' ')
    });
  }

  _handleClear() {
    this._input.property('value', '');
    this._clear.style('display', 'none');
    this._root.dispatch('filter', {
      detail: false
    });
  }
}
