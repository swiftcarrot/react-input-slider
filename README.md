# react-input-slider
React input slider component
### Installation
``` sh
npm install react-input-slider --save
```
### Demo
[https://wangzuo.github.io/react-input-slider](https://wangzuo.github.io/react-input-slider)
### Usage
``` javascript
var React = require('react');
var InputSlider = require('react-input-slider');

var App = React.createClass({
  getInitialState() {
    return {
      x: 10,
      y: 10
    };
  },

  render() {
    return (
      <InputSlider
        className="slider slider-xy"
        axis='xy'
        x={this.state.x}
        xmax={100}
        y={this.state.y}
        ymax={100}
        onChange={this.handleChange}
      />
    );
  },

  handleChange(pos) {
    this.setState({
      x: pos.x,
      y: pos.y
    });
  }
});
```
### Props
|name |type   | description | default
|-----|----   | ----------  | -------
|axis |string | type of slider (`'x'`, `'y'`, `'xy'`)| `'x'`
|x    |number | value of x  ||
|xmax |number | max of x    ||
|xmin |number | min of x    | `0`
|y    |number | value of y  ||
|ymax |number | max of y    ||
|ymin |number | min of y    | `0`
|onChange|function|change callback|`null`
|onDragEnd|function|dragEnd callback|`null`
### License
MIT
