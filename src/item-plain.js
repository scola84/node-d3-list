import Item from './item';

export default class PlainItem extends Item {
  constructor() {
    super();

    this._sub = null;
    this._subPadding = null;

    this._action = null;
    this._actionPadding = null;
    this._actionName = null;

    this._root.classed('plain', true);

    this._label = this._root
      .append('div')
      .classed('scola label', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'flex': 1,
        'order': 3,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._labelPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 4,
        'width': '1em'
      });
  }

  label(text) {
    if (typeof text === 'undefined') {
      return this._label;
    }

    this._label.text(text);
    return this;
  }

  sub(sub) {
    if (typeof sub === 'undefined') {
      return this._sub;
    }

    if (sub === false) {
      return this._deleteSub();
    }

    if (this._sub) {
      return this._updateSub(sub);
    }

    return this._insertSub(sub);
  }

  action(name, size = '2em') {
    if (typeof name === 'undefined') {
      return this._action;
    }

    if (name === false) {
      return this._deleteAction();
    }

    if (this._action) {
      return this._updateAction(name, size);
    }

    return this._insertAction(name, size);
  }

  _insertSub(sub) {
    this._sub = this._root
      .append('div')
      .classed('scola sub', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'color': '#AAA',
        'order': 5
      })
      .text(sub);

    this._subPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 6,
        'width': '1em'
      });

    return this;
  }

  _updateSub(sub) {
    this._sub.text(sub);
    return this;
  }

  _deleteSub() {
    if (this._sub) {
      this._sub.remove();
      this._sub = null;

      this._subPadding.remove();
      this._subPadding = null;
    }

    return this;
  }

  _insertAction(name, size) {
    this._actionName = name;

    this._action = this._root
      .append('div')
      .classed('scola action', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'color': '#BBB',
        'display': 'flex',
        'order': 7
      });

    this._action
      .append('div')
      .classed(name, true)
      .style('font-size', size);

    this._actionPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'order': 8,
        'width': '1em'
      });

    return this;
  }

  _updateAction(name, size) {
    this._action
      .classed(this._actionName, false)
      .classed(name, true)
      .style('font-size', size);

    this._actionName = name;
    return this;
  }

  _deleteAction() {
    if (this._action) {
      this._action.remove();
      this._action = null;

      this._actionPadding.remove();
      this._actionPadding = null;
    }

    return this;
  }
}
