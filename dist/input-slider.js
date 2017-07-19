'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputSlider = function (_Component) {
  _inherits(InputSlider, _Component);

  function InputSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InputSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputSlider.__proto__ || Object.getPrototypeOf(InputSlider)).call.apply(_ref, [this].concat(args))), _this), _this.getClientPosition = function (e) {
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
    }, _this.getPosition = function () {
      var top = (_this.props.y - _this.props.ymin) / (_this.props.ymax - _this.props.ymin) * 100;
      var left = (_this.props.x - _this.props.xmin) / (_this.props.xmax - _this.props.xmin) * 100;

      if (top > 100) top = 100;
      if (top < 0) top = 0;
      if (_this.props.axis === 'x') top = 0;
      top += '%';

      if (left > 100) left = 100;
      if (left < 0) left = 0;
      if (_this.props.axis === 'y') left = 0;
      left += '%';

      return { top: top, left: left };
    }, _this.change = function (pos, dragEnd) {
      if (!_this.props.onChange) return;

      var rect = _reactDom2.default.findDOMNode(_this).getBoundingClientRect();
      var width = rect.width,
          height = rect.height;
      var axis = _this.props.axis;
      var top = pos.top,
          left = pos.left;


      if (left < 0) left = 0;
      if (left > width) left = width;
      if (top < 0) top = 0;
      if (top > height) top = height;

      var x = 0;
      var y = 0;
      if (axis === 'x' || axis === 'xy') {
        x = left / width * (_this.props.xmax - _this.props.xmin) + _this.props.xmin;
      }
      if (axis === 'y' || axis === 'xy') {
        y = top / height * (_this.props.ymax - _this.props.ymin) + _this.props.ymin;
      }

      _this.props.onChange({ x: x, y: y });
    }, _this.handleMouseDown = function (e) {
      e.preventDefault();
      var dom = _this.refs.handle;
      var clientPos = _this.getClientPosition(e);

      _this.start = {
        x: dom.offsetLeft,
        y: dom.offsetTop
      };

      _this.offset = {
        x: clientPos.x,
        y: clientPos.y
      };

      document.addEventListener('mousemove', _this.handleDrag);
      document.addEventListener('mouseup', _this.handleDragEnd);

      document.addEventListener('touchmove', _this.handleDrag);
      document.addEventListener('touchend', _this.handleDragEnd);
      document.addEventListener('touchcancel', _this.handleDragEnd);
    }, _this.getPos = function (e) {
      var clientPos = _this.getClientPosition(e);
      var rect = _reactDom2.default.findDOMNode(_this).getBoundingClientRect();
      var posX = clientPos.x + _this.start.x - _this.offset.x;
      var posY = clientPos.y + _this.start.y - _this.offset.y;

      return {
        left: posX,
        top: posY
      };
    }, _this.handleDrag = function (e) {
      e.preventDefault();
      _this.change(_this.getPos(e));
    }, _this.handleDragEnd = function (e) {
      e.preventDefault();
      document.removeEventListener('mousemove', _this.handleDrag);
      document.removeEventListener('mouseup', _this.handleDragEnd);

      document.removeEventListener('touchmove', _this.handleDrag);
      document.removeEventListener('touchend', _this.handleDragEnd);
      document.removeEventListener('touchcancel', _this.handleDragEnd);

      if (_this.props.onDragEnd) {
        _this.props.onDragEnd();
      }
    }, _this.handleClick = function (e) {
      var clientPos = _this.getClientPosition(e);
      var rect = _reactDom2.default.findDOMNode(_this).getBoundingClientRect();

      _this.change({
        left: clientPos.x - rect.left,
        top: clientPos.y - rect.top
      }, true);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputSlider, [{
    key: 'render',
    value: function render() {
      var axis = this.props.axis;

      var props = (0, _blacklist2.default)(this.props, 'axis', 'x', 'y', 'xmin', 'xmax', 'ymin', 'ymax', 'onChange', 'onDragEnd', 'className', 'onClick');
      var pos = this.getPosition();

      var valueStyle = {};
      if (axis === 'x') valueStyle.width = pos.left;
      if (axis === 'y') valueStyle.height = pos.top;

      props.className = (0, _classnames2.default)('u-slider', 'u-slider-' + axis, this.props.className);

      return _react2.default.createElement(
        'div',
        _extends({}, props, { onClick: this.handleClick }),
        _react2.default.createElement('div', { className: 'value', style: valueStyle }),
        _react2.default.createElement('div', {
          className: 'handle',
          ref: 'handle',
          onTouchStart: this.handleMouseDown,
          onMouseDown: this.handleMouseDown,
          onClick: function onClick(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          },
          style: pos
        })
      );
    }
  }]);

  return InputSlider;
}(_react.Component);

InputSlider.propTypes = {
  axis: _propTypes2.default.string,
  x: _propTypes2.default.number,
  xmax: _propTypes2.default.number,
  xmin: _propTypes2.default.number,
  y: _propTypes2.default.number,
  ymax: _propTypes2.default.number,
  ymin: _propTypes2.default.number
};
InputSlider.defaultProps = {
  axis: 'x',
  xmin: 0,
  ymin: 0
};


module.exports = InputSlider;