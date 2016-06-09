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
        'width': '4.25em',
        'display': 'flex',
        'align-items': 'center'
      });

    this._checker = this._checkerOuter
      .append('div')
      .classed('scola checker', true)
      .styles({
        'cursor': 'pointer',
        'width': '3.25em',
        'height': '2em',
        'border': '1px solid #CCC',
        'border-radius': '1em',
        'position': 'relative'
      })
      .on('click.item-check', this._handleClick.bind(this));

    this._checkerBackground = this._checker
      .append('div')
      .classed('scola checker-background', true)
      .styles({
        background: 'green',
        opacity: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        'border-radius': '1em'
      });

    this._checkerInner = this._checker
      .append('div')
      .classed('scola checker-inner', true)
      .styles({
        'background': '#FFF',
        width: '1.85em',
        height: '1.85em',
        'border-radius': '1em',
        'box-shadow': '0 1px 5px #AAA',
        'position': 'absolute'
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
    if (event.detail.item.checked()) {
      this._checkerBackground.transition().style('opacity', '1');
      this._checkerInner.transition().style('left', '1.27em');
    } else {
      this._checkerBackground.transition().style('opacity', '0');
      this._checkerInner.transition().style('left', '0');
    }
  }
}
