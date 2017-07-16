import { select } from 'd3';
import Part from '../part';

export default class Text extends Part {
  constructor() {
    super();

    this._overflow = null;

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

    this._sup = this._wrapper
      .append('div')
      .styles({
        'color': '#AAA',
        'display': 'none',
        'font-size': '0.8em',
        'padding': '0 0.25em 0.25em'
      });

    this._button = this._wrapper
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

    this._text = this._button
      .append('span')
      .styles({
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
  }

  button() {
    return this._button;
  }

  overflow(value = null) {
    if (value === null) {
      return this._overflow;
    }

    this._overflow = value;
    return this;
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

  sup(value = null) {
    if (value === null) {
      return this._sup;
    }

    this._sup
      .style('display', null)
      .text(value);

    return this;
  }

  text(value = null) {
    if (value === null) {
      return this._text;
    }

    this._text.text(value);

    if (this._overflow === 'expand') {
      this._expand(true);
    }

    if (this._overflow === 'title') {
      this._title(value);
    }

    if (this._overflow === 'toggle') {
      this._toggle();
    }

    return this;
  }

  primary(flex = true) {
    this._root.styles({
      'color': '#000',
      'flex': flex === true ? '1 1 0%' : 'none',
      'justify-content': 'flex-start'
    });

    this._wrapper.styles({
      'flex': flex === true && this._overflow !== null ?
        '1 1 0%' : 'none',
    });

    return this;
  }

  secondary(flex = false) {
    this._root.styles({
      'color': '#AAA',
      'flex': flex === true ? '1 1 0%' : 'none',
      'justify-content': 'flex-end'
    });

    this._wrapper.styles({
      'flex': flex === true && this._overflow !== null ?
        '1 1 0%' : 'none',
    });

    this._button.styles({
      'padding': 0
    });

    return this;
  }

  _bindToggle() {
    this._button
      .style('cursor', 'pointer')
      .on('click.scola-list', () => this._expand());
  }

  _unbindToggle() {
    this._button
      .style('cursor', null)
      .on('click.scola-list', null);
  }

  _expand(force = false) {
    this._button.style('white-space', () => {
      return force === true ||
        this._button.style('white-space') === 'nowrap' ?
        null : 'nowrap';
    });
  }

  _overflows() {
    return this._button.node().scrollWidth >
      this._button.node().clientWidth;
  }

  _title(value) {
    this._button.attr('title', () => {
      return this._overflows() === true ? value : null;
    });
  }

  _toggle() {
    this._unbindToggle();

    if (this._overflows() === true) {
      this._bindToggle();
    }
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    this.text(value === null ? '' : value);
  }
}
