import 'd3-selection-multi';

export default class Primary {
  constructor() {
    this._item = null;

    this._icon = null;
    this._iconInner = null;

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

  icon(value, size) {
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

  text(value, size) {
    if (typeof value === 'undefined') {
      return this._text;
    }

    if (value === false) {
      return this._deleteText();
    }

    if (this._text) {
      return this._updateText(value, size);
    }

    return this._insertText(value, size);
  }

  _insertIcon(name, size = '2em') {
    this._iconName = name;

    this._icon = this._item.root()
      .append('div')
      .classed('scola primary icon', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid transparent',
        'display': 'flex',
        'order': 2,
        'width': '2.25em'
      });

    this._iconInner = this._icon
      .append('div')
      .classed(name, true)
      .style('font-size', size);

    return this;
  }

  _updateIcon(name, size) {
    this._iconInner
      .classed(this._iconName, false)
      .classed(name, true);

    if (typeof size !== 'undefined') {
      this._iconInner.style('font-size', size);
    }

    this._iconName = name;
    return this;
  }

  _deleteIcon() {
    if (this._icon) {
      this._icon.remove();
      this._icon = null;
    }

    return this;
  }

  _insertText(text, size) {
    this._text = this._item.root()
      .append('div')
      .classed('scola primary text', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'flex': 1,
        'order': 3,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._textPadding = this._item.root()
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 4,
        'width': '1em'
      });

    if (text) {
      this._text.text(text);
    }

    if (typeof size !== 'undefined') {
      this._text.styles({
        'flex': 'none',
        'width': size
      });
    }

    return this;
  }

  _updateText(text, size) {
    if (text) {
      this._text.text(text);
    }

    if (typeof size !== 'undefined') {
      this._text.styles({
        'flex': 'none',
        'width': size
      });
    }

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
