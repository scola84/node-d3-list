import Text from './text';

export default class TextLink extends Text {
  constructor() {
    super();
    this._prefix = null;
    this._test = null;
  }

  prefix(value = null) {
    if (value === null) {
      return this._prefix;
    }

    this._prefix = value;
    return this;
  }

  test(value = null) {
    if (value === null) {
      return this._test;
    }

    this._test = value;
    return this;
  }

  text(value = null) {
    if (value === null) {
      return this._text;
    }

    const text =
      this._test !== null &&
      this._test(value) === false;

    if (text === true) {
      this._text.text(value);
      return this;
    }

    this._text
      .text(null)
      .append('a')
      .attr('href', (this._prefix || '') + value)
      .text(value);

    return this;
  }
}
