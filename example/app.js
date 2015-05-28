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
          <InputSlider
            className="slider slider-xy"
            axis='xy'
            x={this.state.x}
            xmax={100}
            y={this.state.y}
            ymax={100}
            onChange={this.handleChange}/>
          <span>{'x: ' + this.state.x}</span><br/>
          <span>{'y: ' + this.state.y}</span>
        </div>

        <div className="example example-x">
          <InputSlider
            className="slider slider-x"
            axis="x"
            x={this.state.left}
            xmin={100}
            xmax={360}
            onChange={this.handleChangeX}/>
          <span>{'x: ' + this.state.left}</span>
        </div>

        <div className="example example-y">
          <InputSlider
            className="slider slider-y"
            axis="y"
            y={this.state.top}
            ymin={100}
            ymax={360}
            onChange={this.handleChangeY}/>
          <span>{'y: ' + this.state.top}</span>
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

React.render(<App/>, document.body);
