import InputItem from './src/item-input';
import MenuItem from './src/item-menu';
import PlainItem from './src/item-plain';
import SelectItem from './src/item-select';

import SelectList from './src/list-select';
import StaticList from './src/list-static';

export function input() {
  return new InputItem();
}

export function menuItem() {
  return new MenuItem();
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
