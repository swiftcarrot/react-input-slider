var React = require('react');
var InputSlider = require('../lib/input-slider.js');
require('!style!css!less!../lib/input-slider.less');

var App = React.createClass({
  getInitialState: function() {
    return {
      x: 21,
      y: 73,
      left: 40,
      top: 90
    };
  },

  render: function() {
    return (
      <div className="wrap">
        <div className="example example-xy">
          <InputSlider className="slider slider-xy"
            x={this.state.x} xmax={100}
            y={this.state.y} ymax={100}
            onChange={this._onChange}/>
          <span>{'x: ' + this.state.x}</span><br/>
          <span>{'y: ' + this.state.y}</span>
        </div>

        <div className="example example-x">
          <InputSlider className="slider slider-x"
            axis="x" x={this.state.left} xmax={360}
            onChange={this._onChangex}/>
          <span>{'x: ' + this.state.left}</span>
        </div>

        <div className="example example-y">
          <InputSlider className="slider slider-y"
            axis="y" y={this.state.top} ymax={360}
            onChange={this._onChangey}/>
          <span>{'y: ' + this.state.top}</span>
        </div>
      </div>
    );
  },

  _onChange: function(pos) {
    this.setState({
      x: pos.x,
      y: pos.y
    });
  },

  _onChangex: function(pos) {
    this.setState({
      left: pos.x
    });
  },

  _onChangey: function(pos) {
    this.setState({
      top: pos.y
    })
  }
});

React.render(<App/>, document.body);
