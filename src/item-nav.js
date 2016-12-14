import MenuItem from './item-menu';

export default class NavItem extends MenuItem {
  constructor() {
    super();

    this._root
      .classed('menu', false)
      .classed('nav', true);

    this.secondary()
      .button('ion-ios-arrow-forward');
  }

  _handleUser() {
    if (!this._user.may('GET', this._path())) {
      this.secondary().button(false);
    }

    return super._handleUser();
  }

  _modelSet() {}
}
