import { select } from 'd3-selection';
import Part from '../part';
import 'd3-selection-multi';

export default class Knob extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola knob-root', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'width': '4.25em'
      });

    this._area = this._root
      .append('div')
      .classed('scola area', true)
      .styles({
        'background': '#CCC',
        'border': '1px solid #CCC',
        'border-radius': '1em',
        'height': '2em',
        'position': 'relative',
        'width': '3.25em'
      });

    this._mask = this._area
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

    this._knob = this._area
      .append('button')
      .classed('scola knob', true)
      .attrs({
        'tabindex': -1,
        'type': 'button'
      })
      .styles({
        'background': '#FFF',
        'border': 0,
        'border-radius': '1em',
        'box-shadow': '0 1px 5px #AAA',
        'cursor': 'pointer',
        'height': '1.85em',
        'left': 0,
        'margin': 0,
        'padding': 0,
        'position': 'absolute',
        'transition-duration': '0.25s',
        'transition-property': 'left',
        'width': '1.85em'
      });
  }

  knob() {
    return this._knob;
  }

  tabindex(value = null) {
    if (value === null) {
      return this._knob.attr('tabindex');
    }

    this._knob.attr('tabindex', value);
    return this;
  }

  value(itemValue) {
    const areaStyle = {
      'background': '#CCC',
      'border-color': '#CCC'
    };

    const maskStyle = {
      'transform': 'scale(1)',
      'opacity': '1'
    };

    const knobStyle = {
      'left': '0'
    };

    if (Boolean(itemValue) === true) {
      areaStyle.background = 'green';
      areaStyle['border-color'] = 'green';

      maskStyle.transform = 'scale(0)';
      maskStyle.opacity = '0';

      knobStyle.left = '1.27em';
    }

    this._area.styles(areaStyle);
    this._mask.styles(maskStyle);
    this._knob.styles(knobStyle);
  }
}
