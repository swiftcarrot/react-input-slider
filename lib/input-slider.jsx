var React = require('react');
var PureRenderMixin = require('react/addons').PureRenderMixin;

module.exports = React.createClass({
  displayName: 'InputSlider',

  mixins: [PureRenderMixin],

  render: function() {
    var pos = this.getPosition();

    return (
      <div {...this.props} onClick={this._onClick}>
        <div className="handle" ref="handle"
          onMouseDown={this._onMouseDown}
          style={pos}></div>
      </div>
    );
  },

  getPosition: function() {
    var xmax = this.props.xmax;
    var ymax = this.props.ymax;
    var top = this.props.y/ymax*100;
    var left = this.props.x/xmax*100;

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

  change: function(pos) {
    if(this.props.onChange) {
      var rect = this.getDOMNode().getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var left = pos.left;
      var top = pos.top;
      var axis = this.props.axis;

      if(axis === 'x' && left >= 0 && left <= width) {
        this.props.onChange({
          x: left / width * this.props.xmax,
          y: 0
        });
      } else if(axis === 'y' && top >= 0 && top <= height) {
        this.props.onChange({
          x: 0,
          y: top / height * this.props.ymax,
        });
      } else if(left >= 0 && left <= width && top >= 0 && top <= height) {
        this.props.onChange({
          x: left / width * this.props.xmax,
          y: top / height * this.props.ymax
        });
      }
    }
  },

  _onMouseDown: function(e) {
    var dom = this.refs.handle.getDOMNode();

    this.start = {
      x: dom.offsetLeft,
      y: dom.offsetTop
    };

    this.offset = {
      x: e.clientX,
      y: e.clientY
    };

    window.addEventListener('mousemove', this._drag);
    window.addEventListener('mouseup', this._dragEnd);
  },

  _drag: function(e) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var posX = e.clientX + this.start.x - this.offset.x;
    var posY = e.clientY + this.start.y - this.offset.y;

    this.change({
      left: posX,
      top: posY
    });
  },

  _dragEnd: function(e) {
    window.removeEventListener('mousemove', this._drag);
    window.removeEventListener('mouseup', this._dragEnd);
  },

  _onClick: function(e) {
    var rect = this.getDOMNode().getBoundingClientRect();

    this.change({
      left: (e.clientX - rect.left),
      top: (e.clientY - rect.top)
    });
  }
});
