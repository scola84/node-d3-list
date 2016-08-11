import Item from './item';

export default class SwitchItem extends Item {
  constructor() {
    super();

    this._root
      .classed('plain', false)
      .classed('switch', true);

    this._switchRoot = this._root
      .append('div')
      .classed('scola switch-root', true)
      .styles({
        'align-items': 'center',
        'border-top': '1px solid',
        'border-top-color': 'inherit',
        'display': 'flex',
        'order': 5,
        'width': '4.25em'
      });

    this._switch = this._switchRoot
      .append('div')
      .classed('scola switch', true)
      .styles({
        'background': '#CCC',
        'border': '1px solid #CCC',
        'border-radius': '1em',
        'cursor': 'pointer',
        'height': '2em',
        'position': 'relative',
        'width': '3.25em'
      });

    this._mask = this._switch
      .append('div')
      .classed('scola mask', true)
      .styles({
        'background': '#FFF',
        'border-radius': '1em',
        'height': '100%',
        'position': 'absolute',
        'transform': 'scale(1)',
        'transition-duration': '0.25s',
        'width': '100%'
      });

    this._knob = this._switch
      .append('div')
      .classed('scola knob', true)
      .styles({
        'background': '#FFF',
        'border-radius': '1em',
        'box-shadow': '0 1px 5px #AAA',
        'height': '1.85em',
        'left': 0,
        'position': 'absolute',
        'transition-duration': '0.25s',
        'width': '1.85em'
      });

    this._bind();
  }

  destroy() {
    this._unbind();
    super.destroy();
  }

  _bind() {
    this._switch.on('click.scola-switch-item', () => this._handleClick());
  }

  _unbind() {
    this._switch.on('click.scola-switch-item', null);
  }

  _handleClick() {
    this._model.set(this._name, !this._model.get(this._name));
  }

  _modelChange() {
    const switchStyle = {
      'background': '#CCC'
    };

    const maskStyle = {
      'transform': 'scale(1)',
      'opacity': '1'
    };

    const knobStyle = {
      'left': '0'
    };

    if (Boolean(this._model.get(this._name)) === true) {
      switchStyle.background = 'green';
      maskStyle.transform = 'scale(0)';
      maskStyle.opacity = '0';
      knobStyle.left = '1.27em';
    }

    this._switch.styles(switchStyle);
    this._mask.styles(maskStyle);
    this._knob.styles(knobStyle);
  }
}
