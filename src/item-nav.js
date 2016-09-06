import Item from './item';

export default class NavItem extends Item {
  constructor() {
    super();

    this._root
      .classed('nav', true)
      .style('cursor', 'pointer');

    this.secondary().icon('ion-ios-arrow-forward');
  }

  _modelSet() {}
}
