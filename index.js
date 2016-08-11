import CheckItem from './src/item-check';
import Item from './src/item';
import InputItem from './src/item-input';
import MenuItem from './src/item-menu';
import NavItem from './src/item-nav';
import RadioItem from './src/item-radio';
import SwitchItem from './src/item-switch';

import Button from './src/button';
import Filter from './src/filter';
import Header from './src/header';
import List from './src/list';

export function checkItem() {
  return new CheckItem();
}

export function inputItem() {
  return new InputItem();
}

export function listItem() {
  return new Item();
}

export function menuItem() {
  return new MenuItem();
}

export function navItem() {
  return new NavItem();
}

export function radioItem() {
  return new RadioItem();
}

export function switchItem() {
  return new SwitchItem();
}

export function itemList() {
  return new List();
}

export function listButton() {
  return new Button();
}

export function listFilter() {
  return new Filter();
}

export function listHeader() {
  return new Header();
}
