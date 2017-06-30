import Item from './item';

export default class ButtonItem extends Item {
  constructor() {
    super();

    this._root
      .classed('button', true)
      .styles({
        'background': '#FFF',
        'cursor': 'pointer',
        'height': '3em',
        'justify-content': 'center',
        'padding': '0.5em 0'
      });

    this._button = this._root
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
        'line-height': '2em',
        'margin': 0,
        'padding': '0 0.25em'
      });

    this._text = this._button
      .append('span')
      .styles({
        'position': 'relative'
      });

    this._padding.styles({
      'display': 'none'
    });
  }

  color(value = null) {
    if (value === null) {
      return this._root.style('color');
    }

    this._root.style('color', value);
    return this;
  }

  tabindex(value = null) {
    if (value === null) {
      return this._button.attr('tabindex');
    }

    this._button.attr('tabindex', value);
    return this;
  }

  text(value = null) {
    if (value === null) {
      return this._text;
    }

    this._text.text(value);
    return this;
  }

  _click() {
    if (this._disabled === false && this._model) {
      this._model.set(this._name, this._value);
    }
  }
}
