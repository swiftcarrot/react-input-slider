var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'InputSlider',

  propTypes: {
    axis: React.PropTypes.string,
    x: React.PropTypes.number,
    xmax: React.PropTypes.number,
    xmin: React.PropTypes.number,
    y: React.PropTypes.number,
    ymax: React.PropTypes.number,
    ymin: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      axis: 'x',
      xmin: 0,
      ymin: 0
    };
  },

  render() {
    var axis = this.props.axis;
    var props = blacklist(this.props,
      'axis', 'x', 'y', 'xmin', 'xmax', 'ymin', 'ymax',
      'onChange', 'onDragEnd', 'className', 'onClick');
    var pos = this.getPosition();
    var valueStyle = {};
    if(axis === 'x') valueStyle.width = pos.left;
    if(axis === 'y') valueStyle.height = pos.top;

    props.className = cx('u-slider', `u-slider-${axis}`, this.props.className);

    return (
      <div {... props} onClick={this.handleClick}>
        <div
          className="value"
          style={valueStyle}>
        </div>
        <div
          className="handle"
          ref="handle"
          onTouchStart={this.handleMouseDown}
          onMouseDown={this.handleMouseDown}
          onClick={function(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
          style={pos}>
        </div>
      </div>
    );
  },

  getClientPosition(e) {
    var touches = e.touches;
    if(touches && touches.length) {
      var finger = touches[0];
      return {
        x: finger.clientX,
        y: finger.clientY
      };
    }

    return {
      x: e.clientX,
      y: e.clientY
    };
  },

  getPosition() {
    var top = (this.props.y-this.props.ymin)/(this.props.ymax-this.props.ymin)*100;
    var left = (this.props.x-this.props.xmin)/(this.props.xmax-this.props.xmin)*100;

    if(top > 100) top = 100;
    if(top < 0) top = 0;
    if(this.props.axis === 'x') top = 0;
    top += '%';

    if(left > 100) left = 100;
    if(left < 0) left = 0;
    if(this.props.axis === 'y') left = 0;
    left += '%';

    return {top: top, left: left};
  },

  change(pos, dragEnd) {
    if(!this.props.onChange) return;

    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;
    var left = pos.left;
    var top = pos.top;
    var axis = this.props.axis;

    if(left < 0) left = 0;
    if(left > width) left = width;
    if(top < 0) top = 0;
    if(top > height) top = height;

    var x = 0;
    var y = 0;
    if(axis === 'x' || axis === 'xy') {
      x = left/width*(this.props.xmax-this.props.xmin) + this.props.xmin;
    }
    if(axis === 'y' || axis === 'xy') {
      y = top/height*(this.props.ymax-this.props.ymin) + this.props.ymin;
    }

    this.props.onChange({x: x, y: y});
  },

  handleMouseDown(e) {
    e.preventDefault();
    var dom = this.refs.handle;
    var clientPos = this.getClientPosition(e);

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

    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('touchend', this.handleDragEnd);
    document.addEventListener('touchcancel', this.handleDragEnd);
  },

  getPos(e) {
    var clientPos = this.getClientPosition(e);
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    var posX = clientPos.x + this.start.x - this.offset.x;
    var posY = clientPos.y + this.start.y - this.offset.y;

    return {
      left: posX,
      top: posY
    };
  },

  handleDrag(e) {
    e.preventDefault();
    this.change(this.getPos(e));
  },

  handleDragEnd(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);

    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.handleDragEnd);
    document.removeEventListener('touchcancel', this.handleDragEnd);

    if(this.props.onDragEnd) {
      this.props.onDragEnd();
    }
  },

  handleClick(e) {
    var clientPos = this.getClientPosition(e);
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.change({
      left: (clientPos.x - rect.left),
      top: (clientPos.y - rect.top)
    }, true);
  }
});
