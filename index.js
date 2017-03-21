import ButtonItem from './src/item-button';
import CheckItem from './src/item-check';
import DateItem from './src/item-date';
import Item from './src/item';
import MenuItem from './src/item-menu';
import NavItem from './src/item-nav';
import RadioItem from './src/item-radio';
import List from './src/list';

function buttonItem() {
  return new ButtonItem();
}

function checkItem() {
  return new CheckItem();
}

function dateItem() {
  return new DateItem();
}

function listItem() {
  return new Item();
}

function menuItem() {
  return new MenuItem();
}

function navItem() {
  return new NavItem();
}

function radioItem() {
  return new RadioItem();
}

function itemList() {
  return new List();
}

export {
  buttonItem,
  checkItem,
  dateItem,
  listItem,
  menuItem,
  navItem,
  radioItem,
  itemList
};
