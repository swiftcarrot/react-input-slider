'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var bindAll = require('lodash/bindAll');

var InputSlider = function (_React$Component) {
  _inherits(InputSlider, _React$Component);

  function InputSlider(props) {
    _classCallCheck(this, InputSlider);

    var _this = _possibleConstructorReturn(this, (InputSlider.__proto__ || Object.getPrototypeOf(InputSlider)).call(this, props));

    bindAll(_this, ['getClientPosition', 'handleMouseDown', 'handleDrag', 'handleDragEnd', 'handleClick']);
    return _this;
  }

  _createClass(InputSlider, [{
    key: 'render',
    value: function render() {
      var axis = this.props.axis;
      var props = blacklist(this.props, 'axis', 'x', 'y', 'xmin', 'xmax', 'ymin', 'ymax', 'onChange', 'onDragEnd', 'className', 'onClick');
      var pos = this.getPosition();
      var valueStyle = {};
      if (axis === 'x') valueStyle.width = pos.left;
      if (axis === 'y') valueStyle.height = pos.top;

      props.className = cx('u-slider', 'u-slider-' + axis, this.props.className);

      return React.createElement(
        'div',
        _extends({}, props, { onClick: this.handleClick }),
        React.createElement('div', {
          className: 'value',
          style: valueStyle }),
        React.createElement('div', {
          className: 'handle',
          ref: 'handle',
          onTouchStart: this.handleMouseDown,
          onMouseDown: this.handleMouseDown,
          onClick: function onClick(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          },
          style: pos })
      );
    }
  }, {
    key: 'getClientPosition',
    value: function getClientPosition(e) {
      var touches = e.touches;
      if (touches && touches.length) {
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
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      var top = (this.props.y - this.props.ymin) / (this.props.ymax - this.props.ymin) * 100;
      var left = (this.props.x - this.props.xmin) / (this.props.xmax - this.props.xmin) * 100;

      if (top > 100) top = 100;
      if (top < 0) top = 0;
      if (this.props.axis === 'x') top = 0;
      top += '%';

      if (left > 100) left = 100;
      if (left < 0) left = 0;
      if (this.props.axis === 'y') left = 0;
      left += '%';

      return { top: top, left: left };
    }
  }, {
    key: 'change',
    value: function change(pos, dragEnd) {
      if (!this.props.onChange) return;

      var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var left = pos.left;
      var top = pos.top;
      var axis = this.props.axis;

      if (left < 0) left = 0;
      if (left > width) left = width;
      if (top < 0) top = 0;
      if (top > height) top = height;

      var x = 0;
      var y = 0;
      if (axis === 'x' || axis === 'xy') {
        x = left / width * (this.props.xmax - this.props.xmin) + this.props.xmin;
      }
      if (axis === 'y' || axis === 'xy') {
        y = top / height * (this.props.ymax - this.props.ymin) + this.props.ymin;
      }

      this.props.onChange({ x: x, y: y });
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
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
    }
  }, {
    key: 'getPos',
    value: function getPos(e) {
      var clientPos = this.getClientPosition(e);
      var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
      var posX = clientPos.x + this.start.x - this.offset.x;
      var posY = clientPos.y + this.start.y - this.offset.y;

      return {
        left: posX,
        top: posY
      };
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e) {
      e.preventDefault();
      this.change(this.getPos(e));
    }
  }, {
    key: 'handleDragEnd',
    value: function handleDragEnd(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.handleDragEnd);

      document.removeEventListener('touchmove', this.handleDrag);
      document.removeEventListener('touchend', this.handleDragEnd);
      document.removeEventListener('touchcancel', this.handleDragEnd);

      if (this.props.onDragEnd) {
        this.props.onDragEnd();
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var clientPos = this.getClientPosition(e);
      var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

      this.change({
        left: clientPos.x - rect.left,
        top: clientPos.y - rect.top
      }, true);
    }
  }]);

  return InputSlider;
}(React.Component);

;

InputSlider.displayName = 'InputSlider';

InputSlider.propTypes = {
  axis: PropTypes.string,
  x: PropTypes.number,
  xmax: PropTypes.number,
  xmin: PropTypes.number,
  y: PropTypes.number,
  ymax: PropTypes.number,
  ymin: PropTypes.number
};

InputSlider.defaultProps = {
  axis: 'x',
  xmin: 0,
  ymin: 0
};

module.exports = InputSlider;