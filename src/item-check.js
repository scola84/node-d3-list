import PlainItem from './item-plain';

export default class CheckItem extends PlainItem {
  constructor() {
    super();

    this._checked = false;
    this._value = null;

    this._outer
      .classed('plain', false)
      .classed('check', true)
      .on('check.item-check', this._handleCheck.bind(this));

    this._checkerOuter = this._inner
      .append('div')
      .classed('scola checker-outer', true)
      .styles({
        'align-items': 'center',
        'display': 'flex',
        'width': '4.25em'
      });

    this._checker = this._checkerOuter
      .append('div')
      .classed('scola checker', true)
      .styles({
        'border': '1px solid #CCC',
        'border-radius': '1em',
        'cursor': 'pointer',
        'height': '2em',
        'position': 'relative',
        'width': '3.25em'
      })
      .on('click.item-check', this._handleClick.bind(this));

    this._mask = this._checker
      .append('div')
      .classed('scola mask', true)
      .styles({
        'background': '#FFF',
        'border-radius': '1em',
        'height': '100%',
        'position': 'absolute',
        'transform': 'scale(1)',
        'transition-duration': '0.25s',
        'width': '100%'
      });

    this._button = this._checker
      .append('div')
      .classed('scola button', true)
      .styles({
        'background': '#FFF',
        'border-radius': '1em',
        'box-shadow': '0 1px 5px #AAA',
        'height': '1.85em',
        'position': 'absolute',
        'transition-duration': '0.25s',
        'width': '1.85em'
      });
  }

  destroy() {
    this._outer.on('.item-check', null);
    this._checker.on('.item-check', null);
    this._outer.remove();
  }

  check(checked) {
    this._checked = checked;

    this._outer.dispatch('check', {
      detail: {
        item: this
      }
    });

    return this;
  }

  checked() {
    return this._checked;
  }

  top() {
    super.top();

    this._checkerOuter
      .style('border-top-style', 'none');

    return this;
  }

  value(value) {
    if (typeof value !== 'undefined') {
      this._value = value;
      return this;
    }

    return this._value;
  }

  _handleClick() {
    this.check(!this._checked);
  }

  _handleCheck() {
    const checker = {
      'background': '#CCC'
    };

    const mask = {
      'transform': 'scale(1)',
      'opacity': '1'
    };

    const button = {
      'left': '0'
    };

    if (event.detail.item.checked()) {
      checker.background = 'green';
      mask.transform = 'scale(0)';
      mask.opacity = '0';
      button.left = '1.27em';
    }

    this._checker.styles(checker);
    this._mask.styles(mask);
    this._button.styles(button);
  }
}
