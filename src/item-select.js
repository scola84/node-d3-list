import PlainItem from './item-plain';

export default class SelectItem extends PlainItem {
  constructor() {
    super();

    this._selected = false;
    this._value = null;

    this._outer
      .classed('plain', false)
      .classed('select', true)
      .style('cursor', 'pointer')
      .on('click.item-select', this._handleClick.bind(this))
      .on('select.item-select', this._handleSelect.bind(this));

    this._iconCheckmarkOuter = this._inner
      .append('div')
      .classed('scola icon checkmark-outer', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid #CCC',
        'display': 'none',
        'width': '1.75em'
      });

    this._iconCheckmark = this._iconCheckmarkOuter
      .append('div')
      .classed('scola icon ion-ios-checkmark-empty', true)
      .styles({
        'font-size': '2em'
      });
  }

  destroy() {
    this._outer.on('.item-select', null);
    this._outer.remove();
  }

  select(selected) {
    this._selected = selected;

    this._outer.dispatch('select', {
      detail: {
        item: this
      }
    });

    return this;
  }

  selected() {
    return this._selected;
  }

  top() {
    super.top();

    this._iconCheckmarkOuter
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
    if (this._selected) {
      return;
    }

    this.select(true);
  }

  _handleSelect() {
    if (event.detail.item.selected()) {
      this._iconCheckmarkOuter.style('display', 'flex');
    } else {
      this._iconCheckmarkOuter.style('display', 'none');
    }
  }
}
