import { event } from 'd3-selection';
import PlainItem from './item-plain';

export default class CheckItem extends PlainItem {
  constructor() {
    super();

    this._checked = false;

    this._root
      .classed('plain', false)
      .classed('check', true);

    this._checkerRoot = this._root
      .append('div')
      .classed('scola checker-root', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid #CCC',
        'display': 'flex',
        'order': 5,
        'width': '4.25em'
      });

    this._checker = this._checkerRoot
      .append('div')
      .classed('scola checker', true)
      .styles({
        'background': '#CCC',
        'border': '1px solid #CCC',
        'border-radius': '1em',
        'cursor': 'pointer',
        'height': '2em',
        'position': 'relative',
        'width': '3.25em'
      });

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
        'left': 0,
        'position': 'absolute',
        'transition-duration': '0.25s',
        'width': '1.85em'
      });

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  checked(checked) {
    if (typeof checked === 'undefined') {
      return this._checked;
    }

    this._checked = checked;

    this._root.dispatch('check', {
      detail: {
        item: this
      }
    });

    return this;
  }

  first() {
    super.first();

    this._checkerRoot
      .style('border-top-style', 'none');

    return this;
  }

  _bind() {
    this._root.on('check.scola-check-item',
      this._handleCheck.bind(this));
    this._checker.on('click.scola-check-item',
      () => this.checked(!this._checked));
  }

  _unbind() {
    this._root.on('check.scola-check-item', null);
    this._checker.on('click.scola-check-item', null);
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
