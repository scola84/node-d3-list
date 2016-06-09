import PlainItem from './item-plain';

export default class MenuItem extends PlainItem {
  constructor() {
    super();

    this._outer
      .classed('plain', false)
      .classed('menu', true)
      .style('cursor', 'pointer');

    this._iconForwardOuter = this._inner
      .append('div')
      .classed('scola icon forward-outer', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid #CCC',
        'display': 'flex',
        'width': '1.5em'
      });

    this._iconForward = this._iconForwardOuter
      .append('div')
      .classed('scola icon ion-ios-arrow-forward', true)
      .styles({
        'color': '#BBB',
        'font-size': '1.5em'
      });
  }

  top() {
    super.top();

    this._iconForwardOuter
      .style('border-top-style', 'none');

    return this;
  }
}
