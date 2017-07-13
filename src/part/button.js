import { select } from 'd3';
import Part from '../part';

export default class Button extends Part {
  constructor() {
    super();

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
      .attrs({
        'tabindex': -1,
        'type': 'button'
      })
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

    this._bindButton();

    this.padding(true);
    this.primary();
    this.show(true);
  }

  destroy() {
    this._unbindButton();
    super.destroy();
  }

  button() {
    return this._button;
  }

  icon() {
    return this._icon;
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

  _bindButton() {
    this._button.on('click.scola-item', () => this._click());
  }

  _unbindButton() {
    this._button.on('click.scola-item', null);
  }

  _click() {
    if (this._disabled === false && this._model) {
      this._model.set(this._name, this._value);
    }
  }
}
