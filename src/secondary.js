import 'd3-selection-multi';

export default class Secondary {
  constructor() {
    this._item = null;

    this._icon = null;
    this._iconInner = null;
    this._iconPadding = null;

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

  icon(value, size = '2em') {
    if (typeof value === 'undefined') {
      return this._icon;
    }

    if (value === false) {
      return this._deleteIcon();
    }

    if (this._icon) {
      return this._updateIcon(value, size);
    }

    return this._insertIcon(value, size);
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

  _insertIcon(name, size) {
    this._iconName = name;

    this._icon = this._item.root()
      .append('div')
      .classed('scola secondary icon', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'color': '#BBB',
        'display': 'flex',
        'order': 7
      });

    this._iconInner = this._icon
      .append('div')
      .classed(name, true)
      .style('font-size', size);

    this._iconPadding = this._item.root()
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

  _updateIcon(name, size) {
    this._iconInner
      .classed(this._iconName, false)
      .classed(name, true)
      .style('font-size', size);

    this._iconName = name;
    return this;
  }

  _deleteIcon() {
    if (this._icon) {
      this._icon.remove();
      this._icon = null;

      this._iconPadding.remove();
      this._iconPadding = null;
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