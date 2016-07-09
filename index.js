import CheckItem from './src/item-check';
import InputItem from './src/item-input';
import MenuItem from './src/item-menu';
import NavItem from './src/item-nav';
import PlainItem from './src/item-plain';
import SelectItem from './src/item-select';

import SelectList from './src/list-select';
import StaticList from './src/list-static';

import Filter from './src/filter';
import Header from './src/header';

import SelectAggregate from './src/aggr-select';

export function checkItem() {
  return new CheckItem();
}

export function inputItem() {
  return new InputItem();
}

export function menuItem() {
  return new MenuItem();
}

export function navItem() {
  return new NavItem();
}

export function plainItem() {
  return new PlainItem();
}

export function selectItem() {
  return new SelectItem();
}

export function selectList() {
  return new SelectList();
}

export function staticList() {
  return new StaticList();
}

export function listFilter() {
  return new Filter();
}

export function listHeader() {
  return new Header();
}

export function selectAggregate() {
  return new SelectAggregate();
}
