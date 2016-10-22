import Item from './item';

export default class NavItem extends Item {
  constructor() {
    super();

    this._root
      .classed('nav', true)
      .style('cursor', 'pointer');

    this.secondary().button('ion-ios-arrow-forward');
  }

  _modelSet(event) {
    if (event.name !== this._name) {
      return;
    }

    this.secondary().text(this._format(event.value));
  }
}
