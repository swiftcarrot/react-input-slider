require('../lib/input-slider.less');

var React = require('react');
var InputSlider = require('../lib/input-slider.js');

var App = React.createClass({
  getInitialState() {
    return {
      x: 21,
      y: 73,
      left: 120,
      top: 120
    };
  },

  render() {
    return (
      <div className="wrap">
        <div className="example example-xy">
          <div>{'x: ' + this.state.x}</div>
          <div>{'y: ' + this.state.y}</div>
          <InputSlider
            className="slider"
            axis='xy'
            x={this.state.x}
            xmax={100}
            y={this.state.y}
            ymax={100}
            onChange={this.handleChange}
          />
        </div>

        <div className="example example-x">
          <div>{'x: ' + this.state.left}</div>
          <InputSlider
            className="slider"
            axis="x"
            x={this.state.left}
            xmin={100}
            xmax={360}
            onChange={this.handleChangeX}
          />
        </div>

        <div className="example example-y">
          <div>{'y: ' + this.state.top}</div>
          <InputSlider
            className="slider"
            axis="y"
            y={this.state.top}
            ymin={100}
            ymax={360}
            onChange={this.handleChangeY}
          />
        </div>
      </div>
    );
  },

  handleChange: function(pos) {
    this.setState({
      x: pos.x,
      y: pos.y
    });
  },

  handleChangeX: function(pos) {
    this.setState({
      left: pos.x
    });
  },

  handleChangeY: function(pos) {
    this.setState({
      top: pos.y
    })
  }
});

React.render(<App/>, document.getElementById('app'));
