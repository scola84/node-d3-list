import { select } from 'd3';
import Part from '../part';

export default class Icon extends Part {
  constructor() {
    super();

    this._class = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola icon', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'display': 'flex',
        'min-height': '3em',
        'padding': '0.5em 0'
      });

    this._icon = this._root
      .append('div')
      .styles({
        'display': 'flex',
        'font-size': '2em'
      });

    this.padding(true);
    this.primary();
    this.show(true);
  }

  icon() {
    return this._icon;
  }

  primary() {
    this._root.styles({
      'border-top-color': 'transparent',
      'color': '#000',
      'padding-right': 0,
      'width': '2.25em'
    });

    return this;
  }

  secondary() {
    this._root.styles({
      'border-top-color': 'inherit',
      'color': '#BBB',
      'width': 'auto'
    });

    return this;
  }
}
