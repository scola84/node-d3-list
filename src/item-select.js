import PlainItem from './item-plain';

export default class SelectItem extends PlainItem {
  constructor() {
    super();

    this._selected = false;
    this._value = null;

    this._root
      .classed('plain', false)
      .classed('select', true)
      .style('cursor', 'pointer')
      .on('click.item-select', this._handleClick.bind(this))
      .on('select.item-select', this._handleSelect.bind(this));

    this._iconCheckmarkRoot = this._inner
      .append('div')
      .classed('scola icon checkmark', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid #CCC',
        'display': 'none',
        'width': '1.75em'
      });

    this._iconCheckmark = this._iconCheckmarkRoot
      .append('div')
      .classed('scola icon ion-ios-checkmark-empty', true)
      .styles({
        'font-size': '2em'
      });
  }

  destroy() {
    this._root.on('.item-select', null);
    this._root.remove();
  }

  selected(selected) {
    if (typeof selected === 'undefined') {
      return this._selected;
    }

    this._selected = selected;

    this._root.dispatch('select', {
      detail: {
        item: this
      }
    });

    return this;
  }

  value(value) {
    if (typeof value === 'undefined') {
      return this._value;
    }

    this._value = value;
    return this;
  }

  top() {
    super.top();

    this._iconCheckmarkRoot
      .style('border-top-style', 'none');

    return this;
  }

  _handleClick() {
    if (this._selected) {
      return;
    }

    this.selected(true);
  }

  _handleSelect() {
    if (event.detail.item.selected()) {
      this._iconCheckmarkRoot.style('display', 'flex');
    } else {
      this._iconCheckmarkRoot.style('display', 'none');
    }
  }
}
