import MenuItem from './item-menu';

export default class NavItem extends MenuItem {
  constructor() {
    super();

    this._root
      .classed('menu', false)
      .classed('nav', true);

    this._forward = this
      .icon()
      .class('ion-ios-arrow-forward')
      .size('1.9em')
      .secondary();
  }

  _add(element) {
    this._parts.splice(-1, 0, element);
    this._order();
  }

  _set() {}
}
