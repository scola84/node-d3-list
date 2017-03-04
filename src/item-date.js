import { event, select } from 'd3';
import Item from './item';

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

    this._open = false;
    this._panning = false;
    this._jump = false;

    this._height = null;
    this._scrollLeft = 0;
    this._clear = null;

    this._root
      .classed('date', true)
      .styles({
        'cursor': 'pointer',
        'position': 'relative',
        'overflow': 'hidden'
      });

    this._date = this
      .text()
      .secondary();
  }

  destroy() {
    this._unbindClear();
    super.destroy();
  }

  date() {
    return this._date;
  }

  begin(value = null) {
    if (value === null) {
      return this._begin;
    }

    this._begin = value;
    return this;
  }

  end(value = null) {
    if (value === null) {
      return this._end;
    }

    this._end = value;
    return this;
  }

  formats(value = null) {
    if (value === null) {
      return this._formats;
    }

    Object.assign(this._formats, value);
    return this;
  }

  jump(value = null) {
    if (value === null) {
      return this._jump;
    }

    this._jump = value;
    return this;
  }

  clear(action = null) {
    if (action === null) {
      return this._clear;
    }

    if (action === false) {
      return this._deleteClear();
    }

    return this._insertClear();
  }

  open(value = null) {
    if (value === null) {
      return this._open;
    }

    if (!this._height) {
      this._height = this._root.style('height');
    }

    if (this._open === value) {
      return this;
    }

    this._open = value;
    const height = this._open ? (11 * 16) + 'px' : this._height;

    if (this._open) {
      this._insertSelect();
    }

    this._root
      .transition()
      .style('height', height)
      .on('end', () => {
        if (!this._open) {
          this._deleteSelect();
        }
      });

    return this;
  }

  toggle() {
    return this.open(!this._open);
  }

  _bindSelect() {
    this._select
      .on('mousedown.scola-list', () => { this._panning = false; })
      .on('click.scola-list', () => event.stopPropagation())
      .on('wheel.scola-list', () => event.preventDefault())
      .gesture()
      .on('swiperight', (e) => e.stopPropagation())
      .on('swipeleft', (e) => e.stopPropagation());

    this._year
      .on('click.scola-list', () => this._clickYear())
      .on('wheel.scola-list', () => this._wheel(this._year, event))
      .gesture()
      .on('panstart', () => this._panStart(this._year))
      .on('pan', (e) => this._pan(this._year, e))
      .on('panend', () => this.panEnd(this._year));

    this._month
      .on('click.scola-list', () => this._clickMonth())
      .on('wheel.scola-list', () => this._wheel(this._month, event))
      .gesture()
      .on('panstart', () => this._panStart(this._month))
      .on('pan', (e) => this._pan(this._month, e))
      .on('panend', () => this._panEnd(this._month));

    this._day
      .on('click.scola-list', () => this._clickDay())
      .on('wheel.scola-list', () => this._wheel(this._day, event))
      .gesture()
      .on('panstart', () => this._panStart(this._day))
      .on('pan', (e) => this._pan(this._day, e))
      .on('panend', () => this._panEnd(this._day));
  }

  _unbindSelect() {
    this._select
      .on('.scola-list', null)
      .gesture()
      .destroy();

    this._year
      .on('.scola-list', null)
      .gesture()
      .destroy();

    this._month
      .on('.scola-list', null)
      .gesture()
      .destroy();

    this._day
      .on('.scola-list', null)
      .gesture()
      .destroy();
  }

  _bindClear() {
    if (this._clear) {
      this._clear.root().on('click.scola-list', () => {
        this._clickClear(event);
      });
    }
  }

  _unbindClear() {
    if (this._clear) {
      this._clear.root().on('click.scola-list', null);
    }
  }

  _add(element) {
    this._parts.splice(-2, 0, element);
    this._order();
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const date = setEvent.value;
    const unix = date && date.unix() || -1;

    this._date.text(unix > -1 ? this._format(date) : '');

    if (this._clear) {
      if (unix > -1) {
        this._clear.show();
      } else {
        this._clear.hide();
      }
    }

    if (!this._select) {
      return;
    }

    this._select.selectAll('button')
      .classed('selected', false)
      .classed('disabled', false)
      .styles({
        'background': 'none',
        'color': null,
        'cursor': 'pointer'
      });

    if (date.unix() === -1) {
      return;
    }

    const yearIndex = date.year() - this._begin.year() + 1;
    const monthIndex = date.month() + 1;
    const dayIndex = date.date();

    this._year.select(`button:nth-child(${yearIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007AFF',
        'color': '#FFF'
      });

    this._month.select(`button:nth-child(${monthIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007AFF',
        'color': '#FFF'
      });

    this._day.select(`button:nth-child(${dayIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007AFF',
        'color': '#FFF'
      });

    const daysInMonth = date.daysInMonth();

    for (let i = 31; i > daysInMonth; i -= 1) {
      this._day.select(`button:nth-child(${i})`)
        .classed('disabled', true)
        .attr('tabindex', -1)
        .styles({
          'color': '#AAA',
          'cursor': 'default'
        });
    }
  }

  _click() {
    this.toggle();
  }

  _clickYear() {
    if (!this._model || this._panning) {
      return;
    }

    const index = this._indexOf(event.target);
    let date = this._model.get(this._name);
    date = date.clone();

    if (this._jump === 'begin') {
      date = this._beginYear(date, index);
    } else if (this._jump === 'end') {
      date = this._endYear(date, index);
    } else {
      date = this._exactYear(date, index);
    }

    this._model.set(this._name, date);
  }

  _clickMonth() {
    if (!this._model || this._panning) {
      return;
    }

    let date = this._model.get(this._name);
    date = date.clone();

    date.month(this._indexOf(event.target));

    if (this._jump === 'begin') {
      date = this._beginMonth(date);
    } else if (this._jump === 'end') {
      date = this._endMonth(date);
    }

    this._model.set(this._name, date);
  }

  _clickDay() {
    if (!this._model || this._panning) {
      return;
    }

    if (select(event.target).classed('disabled')) {
      return;
    }

    let date = this._model.get(this._name);
    date = date.clone();

    date.date(this._indexOf(event.target) + 1);

    this._model.set(this._name, date);
  }

  _clickClear() {
    event.stopPropagation();

    if (!this._model) {
      return;
    }

    const date = this._model
      .get(this._name)
      .clone()
      .utc()
      .year(1970)
      .startOf('year')
      .milliseconds(-1);

    this._model.set(this._name, date);
  }

  _panStart(target) {
    this._scrollLeft = parseInt(target.node().scrollLeft, 10);
  }

  _pan(target, panEvent) {
    this._panning = true;
    target.style('cursor', 'move');
    target.node().scrollLeft = this._scrollLeft - panEvent.deltaX;
  }

  _panEnd(target) {
    target.style('cursor', 'pointer');
  }

  _wheel(target, wheelEvent) {
    this._scrollLeft = parseInt(target.node().scrollLeft, 10);
    target.node().scrollLeft = this._scrollLeft + wheelEvent.deltaY;
  }

  _insertClear() {
    this._clear = this
      .button('ion-ios-close-empty')
      .hide()
      .padding(false)
      .secondary();

    this._bindClear();
    return this;
  }

  _deleteClear() {
    this._clear.remove();
    return this;
  }

  _insertSelect() {
    const formatter = this._begin.clone();

    this._select = this._root
      .append('div')
      .classed('scola select', true)
      .styles({
        'border-top': '1px solid #CCC',
        'color': '#000',
        'left': '1em',
        'padding': '0 1em 0 0',
        'position': 'absolute',
        'right': 0,
        'top': '3em'
      });

    this._insertYear(formatter);
    this._insertMonth(formatter);
    this._insertDay(formatter);
    this._bindSelect();

    if (!this._model) {
      return;
    }

    this._setScroll();
    this._set({
      name: this._name,
      scope: 'model',
      value: this._model.get(this._name)
    });
  }

  _insertYear(formatter) {
    this._year = this._select
      .append('div')
      .classed('scola year', true)
      .styles({
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    let i = this._begin.year();
    const max = this._end.year();

    for (; i <= max; i += 1) {
      this._year
        .append('button')
        .attr('tabindex', 0)
        .styles({
          'background': 'none',
          'border': '1px solid transparent',
          'cursor': 'pointer',
          'display': 'inline-block',
          'height': '2em',
          'line-height': '2em',
          'margin': 0,
          'padding': 0,
          'padding-left': '0.5em',
          'padding-right': '0.5em',
          'border-radius': '0.25em'
        })
        .text(formatter.year(i).format(this._formats.year));
    }
  }

  _insertMonth(formatter) {
    this._month = this._select
      .append('div')
      .classed('scola month', true)
      .styles({
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    for (let i = 0; i < 12; i += 1) {
      this._month
        .append('button')
        .attr('tabindex', 0)
        .styles({
          'background': 'none',
          'border': '1px solid transparent',
          'cursor': 'pointer',
          'display': 'inline-block',
          'height': '2em',
          'line-height': '2em',
          'margin': 0,
          'padding': 0,
          'padding-left': '0.5em',
          'padding-right': '0.5em',
          'border-radius': '0.25em'
        })
        .text(formatter
          .month(i)
          .format(this._formats.month));
    }
  }

  _insertDay(formatter) {
    this._day = this._select
      .append('div')
      .classed('scola day', true)
      .styles({
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    for (let i = 1; i <= 31; i += 1) {
      this._day
        .append('button')
        .attr('tabindex', 0)
        .styles({
          'background': 'none',
          'border': '1px solid transparent',
          'cursor': 'pointer',
          'display': 'inline-block',
          'height': '2em',
          'line-height': '2em',
          'margin': 0,
          'padding': 0,
          'padding-left': '0.5em',
          'padding-right': '0.5em',
          'border-radius': '0.25em'
        })
        .text(formatter
          .startOf('year')
          .date(i)
          .format(this._formats.day));
    }
  }

  _deleteSelect() {
    this._unbindSelect();
    this._select.remove();
  }

  _setScroll() {
    const now = this._model.get(this._name);
    const firstYear = this._begin.year();

    const yearIndex = now.year() - firstYear + 1;
    const yearNode = this._year
      .select(`button:nth-child(${yearIndex})`);

    this._year.node().scrollLeft = yearNode.size() === 1 ?
      yearNode.node().offsetLeft : 0;

    const monthIndex = now.month() + 1;
    const monthNode = this._month
      .select(`button:nth-child(${monthIndex})`);

    this._month.node().scrollLeft = monthNode.size() === 1 ?
      monthNode.node().offsetLeft : 0;

    const dayIndex = now.date();
    const dayNode = this._day
      .select(`button:nth-child(${dayIndex})`);

    this._day.node().scrollLeft = dayNode.size() === 1 ?
      dayNode.node().offsetLeft : 0;
  }

  _beginYear(date, index) {
    this._month.node().scrollLeft = 0;
    this._day.node().scrollLeft = 0;

    return date
      .year(this._begin.year() + index)
      .startOf('year');
  }

  _endYear(date, index) {
    this._month.node().scrollLeft = this._month.node().scrollWidth;
    this._day.node().scrollLeft = this._day.node().scrollWidth;

    return date
      .year(this._begin.year() + index)
      .endOf('year');
  }

  _exactYear(date, index) {
    const day = date.date();

    date
      .date(1)
      .year(this._begin.year() + index);

    return date
      .date(Math.min(date.daysInMonth(), day));
  }

  _beginMonth(date) {
    this._day.node().scrollLeft = 0;
    return date.startOf('month');
  }

  _endMonth(date) {
    this._day.node().scrollLeft = this._day.node().scrollWidth;
    return date.endOf('month');
  }

  _indexOf(node) {
    for (let i = 0; i < node.parentNode.children.length; i += 1) {
      if (node.parentNode.children[i] === node) {
        return i;
      }
    }

    return null;
  }
}
