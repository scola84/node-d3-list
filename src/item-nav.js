import PlainItem from './item-plain';

export default class NavItem extends PlainItem {
  constructor() {
    super();

    this._root
      .classed('plain', false)
      .classed('nav', true)
      .style('cursor', 'pointer');

    this.action('ion-ios-arrow-forward');
  }
}
