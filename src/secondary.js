import 'd3-selection-multi';

export default class Secondary {
  constructor() {
    this._item = null;

    this._button = null;
    this._buttonInner = null;
    this._buttonPadding = null;

    this._text = null;
    this._textPadding = null;
  }

  item(value) {
    if (typeof value === 'undefined') {
      return this._item;
    }

    this._item = value;
    return this;
  }

  button(value, size = '2em', type = 'button') {
    if (typeof value === 'undefined') {
      return this._button;
    }

    if (value === false) {
      return this._deleteButton();
    }

    if (this._button) {
      return this._updateButton(value, size, type);
    }

    return this._insertButton(value, size, type);
  }

  text(value) {
    if (typeof value === 'undefined') {
      return this._text;
    }

    if (value === false) {
      return this._deleteText();
    }

    if (this._text) {
      return this._updateText(value);
    }

    return this._insertText(value);
  }

  _insertButton(name, size, type) {
    this._buttonName = name;

    this._button = this._item.root()
      .append('button')
      .classed('scola secondary button', true)
      .attrs({
        type
      })
      .styles({
        'align-items': 'center',
        'background': 'none',
        'border': 0,
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'color': '#BBB',
        'cursor': 'pointer',
        'display': 'flex',
        'order': 7,
        'padding': 0
      });

    this._buttonInner = this._button
      .append('div')
      .classed(name, true)
      .style('font-size', size);

    this._buttonPadding = this._item.root()
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 8,
        'width': '1em'
      });

    return this;
  }

  _updateButton(name, size, type) {
    this._buttonInner
      .classed(this._buttonName, false)
      .classed(name, true)
      .attr('type', type)
      .style('font-size', size);

    this._buttonName = name;
    return this;
  }

  _deleteButton() {
    if (this._button) {
      this._button.remove();
      this._button = null;

      this._buttonPadding.remove();
      this._buttonPadding = null;
    }

    return this;
  }

  _insertText(text) {
    this._text = this._item.root()
      .append('div')
      .classed('scola secondary text', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'color': '#AAA',
        'order': 5
      })
      .text(text);

    this._textPadding = this._item.root()
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 6,
        'width': '1em'
      });

    return this;
  }

  _updateText(text) {
    this._text.text(text);
    return this;
  }

  _deleteText() {
    if (this._text) {
      this._text.remove();
      this._text = null;

      this._textPadding.remove();
      this._textPadding = null;
    }

    return this;
  }
}
