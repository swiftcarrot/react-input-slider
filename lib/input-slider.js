import cx from 'classnames';
import blacklist from 'blacklist';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class InputSlider extends Component {
  static propTypes = {
    axis: PropTypes.string,
    x: PropTypes.number,
    xmax: PropTypes.number,
    xmin: PropTypes.number,
    y: PropTypes.number,
    ymax: PropTypes.number,
    ymin: PropTypes.number,
    xstep: PropTypes.number,
    ystep: PropTypes.number
  };

  static defaultProps = {
    axis: 'x',
    xmin: 0,
    ymin: 0,
    xstep: 1,
    ystep: 1
  };

  render() {
    const { axis } = this.props;
    const props = blacklist(
      this.props,
      'axis',
      'x',
      'y',
      'xmin',
      'xmax',
      'ymin',
      'ymax',
      'xstep',
      'ystep',
      'onChange',
      'onDragEnd',
      'className',
      'onClick'
    );
    const pos = this.getPosition();

    const valueStyle = {};
    if (axis === 'x') valueStyle.width = pos.left;
    if (axis === 'y') valueStyle.height = pos.top;

    props.className = cx('u-slider', `u-slider-${axis}`, this.props.className);

    return (
      <div {...props} onClick={this.handleClick}>
        <div className="value" style={valueStyle} />
        <div
          className="handle"
          ref="handle"
          onTouchStart={this.handleMouseDown}
          onMouseDown={this.handleMouseDown}
          onClick={function(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
          style={pos}
        />
      </div>
    );
  }

  getClientPosition = e => {
    const touches = e.touches;

    if (touches && touches.length) {
      const finger = touches[0];
      return {
        x: finger.clientX,
        y: finger.clientY
      };
    }

    return {
      x: e.clientX,
      y: e.clientY
    };
  };

  getPosition = () => {
    let top =
      (this.props.y - this.props.ymin) /
      (this.props.ymax - this.props.ymin) *
      100;
    let left =
      (this.props.x - this.props.xmin) /
      (this.props.xmax - this.props.xmin) *
      100;

    if (top > 100) top = 100;
    if (top < 0) top = 0;
    if (this.props.axis === 'x') top = 0;
    top += '%';

    if (left > 100) left = 100;
    if (left < 0) left = 0;
    if (this.props.axis === 'y') left = 0;
    left += '%';

    return { top: top, left: left };
  };

  change = (pos, dragEnd) => {
    if (!this.props.onChange) return;

    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const { width, height } = rect;
    const { axis, xstep, ystep, xmax, xmin, ymax, ymin } = this.props;
    let { top, left } = pos;
    let dx = 0;
    let dy = 0;

    if (left < 0) left = 0;
    if (left > width) left = width;
    if (top < 0) top = 0;
    if (top > height) top = height;

    if (axis === 'x' || axis === 'xy') {
      dx = left / width * (xmax - xmin);
    }

    if (axis === 'y' || axis === 'xy') {
      dy = top / height * (ymax - ymin);
    }

    const x = (dx !== 0 ? parseInt(dx / xstep, 10) * xstep : 0) + xmin;
    const y = (dy !== 0 ? parseInt(dy / ystep, 10) * ystep : 0) + ymin;

    this.props.onChange({ x: x, y: y });
  };

  handleMouseDown = e => {
    e.preventDefault();
    const dom = this.refs.handle;
    const clientPos = this.getClientPosition(e);

    this.start = {
      x: dom.offsetLeft,
      y: dom.offsetTop
    };

    this.offset = {
      x: clientPos.x,
      y: clientPos.y
    };

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);

    document.addEventListener('touchmove', this.handleDrag, { passive: false });
    document.addEventListener('touchend', this.handleDragEnd);
    document.addEventListener('touchcancel', this.handleDragEnd);
  };

  getPos = e => {
    const clientPos = this.getClientPosition(e);
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const posX = clientPos.x + this.start.x - this.offset.x;
    const posY = clientPos.y + this.start.y - this.offset.y;

    return {
      left: posX,
      top: posY
    };
  };

  handleDrag = e => {
    e.preventDefault();
    this.change(this.getPos(e));
  };

  handleDragEnd = e => {
    e.preventDefault();
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);

    document.removeEventListener('touchmove', this.handleDrag, { passive: false });
    document.removeEventListener('touchend', this.handleDragEnd);
    document.removeEventListener('touchcancel', this.handleDragEnd);

    if (this.props.onDragEnd) {
      this.props.onDragEnd();
    }
  };

  handleClick = e => {
    const clientPos = this.getClientPosition(e);
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.change(
      {
        left: clientPos.x - rect.left,
        top: clientPos.y - rect.top
      },
      true
    );
  };
}

module.exports = InputSlider;
