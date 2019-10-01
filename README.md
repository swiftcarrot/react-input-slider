# react-input-slider

[![npm](https://img.shields.io/npm/v/react-input-slider.svg)](https://www.npmjs.com/package/react-input-slider)
[![npm](https://img.shields.io/npm/dm/react-input-slider.svg)](https://www.npmjs.com/package/react-input-slider)
[![Build Status](https://travis-ci.org/swiftcarrot/react-input-slider.svg?branch=master)](https://travis-ci.org/swiftcarrot/react-input-slider)
[![codecov](https://codecov.io/gh/swiftcarrot/react-input-slider/branch/master/graph/badge.svg)](https://codecov.io/gh/swiftcarrot/react-input-slider)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

React slider component

### Installation

```sh
yarn add react-input-slider
npm install react-input-slider --save
```

### Demo

[https://swiftcarrot.dev/react-input-slider](https://swiftcarrot.dev/react-input-slider)

### Usage

```javascript
import React from 'react';
import Slider from 'react-input-slider';

function App() {
  const [state, setState] = useState({ x: 10, y: 10 });

  return (
    <div>
      ({state.x}, {state.y})
      <Slider axis="xy" x={state.x} y={state.y} onChange={setState} />
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => setState(state => ({ ...state, x }))}
      />
      <Slider axis="y" y={state.y} onChange={({ y }) => setState(state => ({ ...state, y }))} />
    </div>
  );
}
```

### Styling

v5 introduces a new styling api powered by [emotion](https://emotion.sh/)

```javascript
<Slider
  styles={{
    track: {
      backgroundColor: 'blue'
    },
    active: {
      backgroundColor: 'red'
    },
    thumb: {
      width: 50,
      height: 50
    },
    disabled: {
      opacity: 0.5
    }
  }}
/>
```

### Props

| Name        | Type     | Description                           | Default |
| ----------- | -------- | ------------------------------------- | ------- |
| axis        | string   | type of slider (`'x'`, `'y'`, `'xy'`) | `'x'`   |
| x           | number   | value of x                            | `50`    |
| xmax        | number   | max of x                              | `100`   |
| xmin        | number   | min of x                              | `0`     |
| y           | number   | value of y                            | `50`    |
| ymax        | number   | max of y                              | `100`   |
| ymin        | number   | min of y                              | `0`     |
| xstep       | number   | step of x                             | `1`     |
| ystep       | number   | step of y                             | `1`     |
| onChange    | function | handleChange                          | `null`  |
| onDragStart | function | handleDragStart                       | `null`  |
| onDragEnd   | function | handleDragEnd                         | `null`  |
| disabled    | boolean  | input disabled                        | false   |

### License

MIT
