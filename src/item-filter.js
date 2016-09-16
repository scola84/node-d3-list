import { event } from 'd3-selection';
import Item from './item';

export default class FilterItem extends Item {
  constructor() {
    super();

    this._root
      .classed('filter', true)
      .styles({
        'background': '#CCC',
        'display': 'block',
        'padding': '0.5em'
      });

    this._padding.remove();
    this._padding = null;

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

  destroy() {
    this._unbind();
    super.destroy();
  }

  name(itemName) {
    this._input.attr('name', itemName);
    return super.name(itemName);
  }

  input() {
    return this._input;
  }

  _bind() {
    this._input.on('keyup.scola-filter', () => this._handleInput());
    this._clear.on('click.scola-filter', () => this._handleClear());
  }

  _unbind() {
    this._input.on('input.scola-filter', null);
    this._clear.on('click.scola-filter', null);
  }

  _handleInput() {
    if (event.keyCode !== 13 && event.keyCode !== 27) {
      return;
    }

    this._model
      .set(this._name, this._input.property('value'))
      .commit();
  }

  _handleClear() {
    this._model
      .set(this._name, '')
      .commit();
  }

  _modelSet(modelEvent) {
    if (modelEvent.name !== this._name) {
      return;
    }

    const value = this._format(modelEvent.value) || '';
    this._input.property('value', value);

    if (value.length === 0) {
      this._clear.style('display', 'none');
    } else {
      this._clear.style('display', 'flex');
    }
  }
}
