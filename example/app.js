require('../lib/input-slider.less');

var React = require('react');
var ReactDOM = require('react-dom');
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
          <h3>axis='xy'</h3>
          <div>{'x: ' + this.state.x}</div>
          <div>{'y: ' + this.state.y}</div>
          <InputSlider
            className="slider"
            axis='xy'
            x={this.state.x}
            xmax={100}
            y={this.state.y}
            ymax={100}
            onDragEnd={this.handleDragEnd}
            onChange={this.handleChange}
          />
        </div>

        <div className="example example-x">
          <h3>axis='x'</h3>
          <div>{'x: ' + this.state.left}</div>
          <InputSlider
            className="slider"
            axis="x"
            x={this.state.left}
            xmin={100}
            xmax={360}
            onDragEnd={this.handleDragEnd}
            onChange={this.handleChangeX}
          />
        </div>

        <div className="example example-y">
          <h3>axis='y'</h3>
          <div>{'y: ' + this.state.top}</div>
          <InputSlider
            className="slider"
            axis="y"
            y={this.state.top}
            ymin={100}
            ymax={360}
            onDragEnd={this.handleDragEnd}
            onChange={this.handleChangeY}
          />
        </div>
      </div>
    );
  },

  handleDragEnd() {
    console.log('handleDragEnd');
  },

  handleChange(pos) {
    this.setState({
      x: pos.x,
      y: pos.y
    });
  },

  handleChangeX(pos) {
    this.setState({
      left: pos.x
    });
  },

  handleChangeY(pos) {
    this.setState({
      top: pos.y
    })
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
