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
      .secondary();
  }

  _add(element) {
    this._elements.splice(-1, 0, element);
    this._order();
  }

  _authorize() {
    if (!this._user.may('GET', this._path())) {
      this._forward.show(false);
    }

    super._authorize();
  }

  _set() {}
}
