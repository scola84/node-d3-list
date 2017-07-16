import { select } from 'd3';
import Part from '../part';

export default class Texts extends Part {
  constructor() {
    super();

    this._lines = [];
    this._current = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola text', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': '1 1 0%',
        'overflow': 'hidden',
        'padding': '0.375em 0'
      });

    this._container = this._root
      .append('div')
      .styles({
        'display': 'flex',
        'flex': '1 1 0%',
        'flex-flow': 'row wrap'
      });

    this.padding(true);
  }

  current() {
    return this._current;
  }

  line(index) {
    if (typeof this._lines[index] === 'undefined') {
      this._lines[index] = this._createText();
    }

    this._current = this._lines[index];
    return this;
  }

  text(value = null) {
    if (value === null) {
      return this._current;
    }

    this._current
      .select('span')
      .text(value);

    return this;
  }

  primary(sub = false) {
    this._current.styles({
      'flex': '1 1 0%'
    });

    this._current.styles(() => {
      return sub === false ? {
        'color': '#000',
        'font-weight': 'bold'
      } : {
        'color': '#777',
        'font-weight': 'normal',
        'text-align': 'right'
      };
    });

    return this;
  }

  secondary() {
    this._current.styles({
      'color': '#000',
    });

    return this;
  }

  tertiary() {
    this._current.styles({
      'color': '#777',
      'font-size': '0.8em'
    });

    return this;
  }

  _createText() {
    const text = this._container
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
        'flex': '1 1 100%',
        'overflow': 'hidden',
        'padding': '0.125em',
        'text-align': 'left',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    text
      .append('span')
      .styles({
        'font-size': 'inherit',
        'position': 'relative'
      });

    return text;
  }

  _set() {}
}
