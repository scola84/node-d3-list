import { event, select } from 'd3-selection';
import Item from './item';
import 'd3-selection-multi';

export default class DateItem extends Item {
  constructor() {
    super();

    this._begin = null;
    this._end = null;

    this._formats = {
      day: 'D',
      month: 'MMMM',
      year: 'YYYY'
    };

    this._height = null;
    this._open = false;
    this._pan = false;
    this._scrollLeft = 0;

    this._root
      .classed('date', true)
      .styles({
        'cursor': 'pointer',
        'position': 'relative',
        'overflow': 'hidden'
      });

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  begin(value) {
    this._begin = value;
    return this;
  }

  end(value) {
    this._end = value;
    return this;
  }

  formats(value) {
    Object.assign(this._formats, value);
    return this;
  }

  open(value) {
    if (!this._height) {
      this._height = this._root.style('height');
    }

    if (this._open === value) {
      return this;
    }

    this._open = value;
    const height = this._open ? (11 * 16) + 'px' : this._height;

    if (this._open) {
      this._createSelect();
    }

    this._root
      .transition()
      .style('height', height)
      .on('end', () => {
        if (!this._open) {
          this._destroySelect();
        }
      });

    return this;
  }

  toggle() {
    return this.open(!this._open);
  }

  _bind() {
    this._root.on('click.scola-item-date', () => this.toggle());
  }

  _unbind() {
    this._root.on('click.scola-item-date', null);
  }

  _createSelect() {
    const formatter = this._begin.clone();

    this._select = this._root
      .append('div')
      .classed('scola select', true)
      .styles({
        'border-top': '1px solid #CCC',
        'color': '#000',
        'position': 'absolute',
        'top': '3em',
        'left': '1em',
        'right': 0,
        'padding': '0 1em 0 0'
      });

    this._root.node().appendChild(this._select.node());

    this._year = this._select
      .append('div')
      .classed('scola year', true)
      .styles({
        'display': 'flex',
        'height': '2em',
        'line-height': '2em',
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'padding': '1px 0'
      });

    let i = this._begin.year();
    let max = this._end.year();

    for (; i <= max; i += 1) {
      this._year
        .append('div')
        .styles({
          'display': 'flex',
          'padding-left': '0.5em',
          'padding-right': '0.5em',
          'border-radius': '0.25em'
        })
        .text(formatter.year(i).format(this._formats.year));
    }

    this._month = this._select
      .append('div')
      .classed('scola month', true)
      .styles({
        'display': 'flex',
        'height': '2em',
        'line-height': '2em',
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'padding': '1px 0'
      });

    i = 0;
    max = 12;

    for (; i < max; i += 1) {
      this._month
        .append('div')
        .styles({
          'display': 'flex',
          'padding-left': '0.5em',
          'padding-right': '0.5em',
          'border-radius': '0.25em'
        })
        .text(formatter
          .month(i)
          .format(this._formats.month));
    }

    this._day = this._select
      .append('div')
      .classed('scola day', true)
      .styles({
        'display': 'flex',
        'height': '2em',
        'line-height': '2em',
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'padding': '1px 0'
      });

    i = 1;
    max = 31;

    for (; i <= max; i += 1) {
      this._day
        .append('div')
        .styles({
          'display': 'flex',
          'padding-left': '0.5em',
          'padding-right': '0.5em',
          'border-radius': '0.25em'
        })
        .text(formatter
          .startOf('year')
          .date(i)
          .format(this._formats.day));
    }

    this._setScroll();
    this._bindSelect();

    this._modelSet({
      action: 'model',
      name: this._name,
      value: this._model.get(this._name)
    });
  }

  _destroySelect() {
    this._unbindSelect();
    this._select.remove();
  }

  _setScroll() {
    const now = this._model.get(this._name);
    const firstYear = this._begin.year();

    const yearIndex = now.year() - firstYear + 1;
    this._year.node().scrollLeft = this._year
      .select(`:nth-child(${yearIndex})`).node().offsetLeft;

    const monthIndex = now.month() + 1;
    this._month.node().scrollLeft = this._month
      .select(`:nth-child(${monthIndex})`).node().offsetLeft;

    const dayIndex = now.date();
    this._day.node().scrollLeft = this._day
      .select(`:nth-child(${dayIndex})`).node().offsetLeft;
  }

  _bindSelect() {
    this._select
      .on('mousedown.scola-item-date', () => { this._pan = false; })
      .on('click.scola-item-date', () => event.stopPropagation())
      .on('wheel.scola-item-date', () => event.preventDefault())
      .gesture()
      .on('swiperight', (e) => e.stopPropagation())
      .on('swipeleft', (e) => e.stopPropagation());

    this._year
      .on('click.scola-item-date', () => this._handleYearClick())
      .on('wheel.scola-item-date', () => this._handleWheel(this._year, event))
      .gesture()
      .on('panstart', () => this._handlePanStart(this._year))
      .on('pan', (e) => this._handlePan(this._year, e))
      .on('panend', () => this._handlePanEnd(this._year));

    this._month
      .on('click.scola-item-date', () => this._handleMonthClick())
      .on('wheel.scola-item-date', () => this._handleWheel(this._month, event))
      .gesture()
      .on('panstart', () => this._handlePanStart(this._month))
      .on('pan', (e) => this._handlePan(this._month, e))
      .on('panend', () => this._handlePanEnd(this._month));

    this._day
      .on('click.scola-item-date', () => this._handleDayClick())
      .on('wheel.scola-item-date', () => this._handleWheel(this._day, event))
      .gesture()
      .on('panstart', () => this._handlePanStart(this._day))
      .on('pan', (e) => this._handlePan(this._day, e))
      .on('panend', () => this._handlePanEnd(this._day));
  }

  _unbindSelect() {
    this._select
      .on('.scola-item-date', null)
      .gesture()
      .destroy();

    this._year
      .on('.scola-item-date', null)
      .gesture()
      .destroy();

    this._month
      .on('.scola-item-date', null)
      .gesture()
      .destroy();

    this._day
      .on('.scola-item-date', null)
      .gesture()
      .destroy();
  }

  _handlePanStart(target) {
    this._scrollLeft = parseInt(target.node().scrollLeft, 10);
  }

  _handlePan(target, panEvent) {
    this._pan = true;
    target.style('cursor', 'move');
    target.node().scrollLeft = this._scrollLeft - panEvent.deltaX;
  }

  _handlePanEnd(target) {
    target.style('cursor', 'pointer');
  }

  _handleWheel(target, wheelEvent) {
    this._scrollLeft = parseInt(target.node().scrollLeft, 10);
    target.node().scrollLeft = this._scrollLeft + wheelEvent.deltaY;
  }

  _handleYearClick() {
    if (this._pan) {
      return;
    }

    const index = this._indexOf(event.target);
    const date = this._model.get(this._name);
    const copy = date.clone();
    const firstYear = this._begin.year();

    copy.date(1).year(firstYear + index);

    if (date.date() > copy.daysInMonth()) {
      date.date(copy.daysInMonth());
    }

    this._model.set(this._name, date.year(firstYear + index));
  }

  _handleMonthClick() {
    if (this._pan) {
      return;
    }

    const index = this._indexOf(event.target);
    const date = this._model.get(this._name);
    this._model.set(this._name, date.month(index));
  }

  _handleDayClick() {
    if (this._pan) {
      return;
    }

    if (select(event.target).classed('disabled')) {
      return;
    }

    const index = this._indexOf(event.target);
    const date = this._model.get(this._name);
    this._model.set(this._name, date.date(index + 1));
  }

  _indexOf(node) {
    for (let i = 0; i < node.parentNode.children.length; i += 1) {
      if (node.parentNode.children[i] === node) {
        return i;
      }
    }

    return null;
  }

  _modelSet(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    this.secondary().text(this._format(setEvent.value));

    if (!this._select) {
      return;
    }

    const date = this._model.get(this._name);
    const firstYear = this._begin.year();

    const yearIndex = date.year() - firstYear + 1;
    const monthIndex = date.month() + 1;
    const dayIndex = date.date();

    this._year.selectAll('div')
      .classed('selected', false)
      .styles({
        'background': null,
        'color': null
      });

    this._year.select(`div:nth-child(${yearIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007aff',
        'color': '#FFF'
      });

    this._month.selectAll('div')
      .classed('selected', false)
      .styles({
        'background': null,
        'color': null
      });

    this._month.select(`div:nth-child(${monthIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007aff',
        'color': '#FFF'
      });

    this._day.selectAll('div')
      .classed('selected', false)
      .classed('disabled', false)
      .styles({
        'background': null,
        'color': null,
        'cursor': null
      });

    this._day.select(`div:nth-child(${dayIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007aff',
        'color': '#FFF'
      });

    const daysInMonth = date.daysInMonth();

    for (let i = 31; i > daysInMonth; i -= 1) {
      this._day.select(`:nth-child(${i})`)
        .classed('disabled', true)
        .styles({
          'color': '#AAA',
          'cursor': 'default'
        });
    }
  }
}
