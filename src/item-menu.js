import PlainItem from './item-plain';

export default class MenuItem extends PlainItem {
  constructor() {
    super();

    this._root
      .classed('plain', false)
      .classed('menu', true)
      .style('cursor', 'pointer');

    this._iconForwardRoot = this._inner
      .append('div')
      .classed('scola icon forward-root', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid #CCC',
        'display': 'flex',
        'width': '1.5em'
      });

    this._iconForward = this._iconForwardRoot
      .append('div')
      .classed('scola icon ion-ios-arrow-forward', true)
      .styles({
        'color': '#BBB',
        'font-size': '1.5em'
      });
  }

  top() {
    super.top();

    this._iconForwardRoot
      .style('border-top-style', 'none');

    return this;
  }
}
