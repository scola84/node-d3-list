import { event, select } from 'd3-selection';
import Item from './item';
import 'd3-selection-multi';
import 'd3-transition';
import '@scola/d3-gesture';

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
    this._pan = false;

    this._height = null;
    this._scrollLeft = 0;

    this._root
      .classed('date', true)
      .styles({
        'cursor': 'pointer',
        'position': 'relative',
        'overflow': 'hidden'
      });

    this._text = this.text().secondary();

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
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
    this._root.on('click.scola-list', () => this.toggle());
  }

  _unbind() {
    this._root.on('click.scola-list', null);
  }

  _createSelect() {
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

    this._root.node().appendChild(this._select.node());

    this._year = this._select
      .append('div')
      .classed('scola year', true)
      .styles({
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    let i = this._begin.year();
    let max = this._end.year();

    for (; i <= max; i += 1) {
      this._year
        .append('button')
        .attr('tabindex', 0)
        .styles({
          'background': 'none',
          'border': 0,
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

    this._month = this._select
      .append('div')
      .classed('scola month', true)
      .styles({
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    i = 0;
    max = 12;

    for (; i < max; i += 1) {
      this._month
        .append('button')
        .attr('tabindex', 0)
        .styles({
          'background': 'none',
          'border': 0,
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

    this._day = this._select
      .append('div')
      .classed('scola day', true)
      .styles({
        'margin-top': '0.5em',
        'overflow': 'hidden',
        'white-space': 'nowrap'
      });

    i = 1;
    max = 31;

    for (; i <= max; i += 1) {
      this._day
        .append('button')
        .attr('tabindex', 0)
        .styles({
          'background': 'none',
          'border': 0,
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

    this._setScroll();
    this._bindSelect();

    this._set({
      name: this._name,
      scope: 'model',
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
      .select(`button:nth-child(${yearIndex})`).node().offsetLeft;

    const monthIndex = now.month() + 1;
    this._month.node().scrollLeft = this._month
      .select(`button:nth-child(${monthIndex})`).node().offsetLeft;

    const dayIndex = now.date();
    this._day.node().scrollLeft = this._day
      .select(`button:nth-child(${dayIndex})`).node().offsetLeft;
  }

  _bindSelect() {
    this._select
      .on('mousedown.scola-list', () => { this._pan = false; })
      .on('click.scola-list', () => event.stopPropagation())
      .on('wheel.scola-list', () => event.preventDefault())
      .gesture()
      .on('swiperight', (e) => e.stopPropagation())
      .on('swipeleft', (e) => e.stopPropagation());

    this._year
      .on('click.scola-list', () => this._handleYearClick())
      .on('wheel.scola-list', () => this._handleWheel(this._year, event))
      .gesture()
      .on('panstart', () => this._handlePanStart(this._year))
      .on('pan', (e) => this._handlePan(this._year, e))
      .on('panend', () => this._handlePanEnd(this._year));

    this._month
      .on('click.scola-list', () => this._handleMonthClick())
      .on('wheel.scola-list', () => this._handleWheel(this._month, event))
      .gesture()
      .on('panstart', () => this._handlePanStart(this._month))
      .on('pan', (e) => this._handlePan(this._month, e))
      .on('panend', () => this._handlePanEnd(this._month));

    this._day
      .on('click.scola-list', () => this._handleDayClick())
      .on('wheel.scola-list', () => this._handleWheel(this._day, event))
      .gesture()
      .on('panstart', () => this._handlePanStart(this._day))
      .on('pan', (e) => this._handlePan(this._day, e))
      .on('panend', () => this._handlePanEnd(this._day));
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

  _add(element) {
    this._elements.splice(-1, 0, element);
    this._order();
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    const value = this._format(setEvent.value);
    this._text.text(value);

    if (!this._select) {
      return;
    }

    const date = this._model.get(this._name);
    const firstYear = this._begin.year();

    const yearIndex = date.year() - firstYear + 1;
    const monthIndex = date.month() + 1;
    const dayIndex = date.date();

    this._year.selectAll('button')
      .classed('selected', false)
      .styles({
        'background': 'none',
        'color': null
      });

    this._year.select(`button:nth-child(${yearIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007AFF',
        'color': '#FFF'
      });

    this._month.selectAll('button')
      .classed('selected', false)
      .styles({
        'background': 'none',
        'color': null
      });

    this._month.select(`button:nth-child(${monthIndex})`)
      .classed('selected', true)
      .styles({
        'background': '#007AFF',
        'color': '#FFF'
      });

    this._day.selectAll('button')
      .classed('selected', false)
      .classed('disabled', false)
      .attr('tabindex', 0)
      .styles({
        'background': 'none',
        'color': null,
        'cursor': 'pointer'
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
}
