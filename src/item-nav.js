import MenuItem from './item-menu';

export default class NavItem extends MenuItem {
  constructor() {
    super();

    this._root
      .classed('menu', false)
      .classed('nav', true);

    this._forward = this
      .icon()
      .secondary();

    this._forward
      .icon()
      .classed('ion-ios-arrow-forward', true)
      .styles({
        'font-size': '1.9em'
      });
  }

  _add(element) {
    this._parts.splice(-1, 0, element);
    this._order();
  }

  _set() {}
}
