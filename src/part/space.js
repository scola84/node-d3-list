import { select } from 'd3';
import Part from '../part';

export default class Space extends Part {
  constructor() {
    super();

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola space', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'flex': '1 1 0%',
        'justify-content': 'flex-end',
        'height': '3em',
        'overflow': 'hidden',
        'padding': '0.5em 0'
      });

    this.padding(true);
  }

  _set() {}
}
