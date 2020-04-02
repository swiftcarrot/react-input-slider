import React, { Fragment, useState } from 'react';
import Slider from '../src';

export default {
  title: 'InputSlider',
  component: Slider
};

export const Default = () => {
  const [state, setState] = useState({ x: 120, y: 120 });

  return (
    <Fragment>
      <div>{'x: ' + state.x}</div>
      <div>{'y: ' + state.y}</div>
      <Slider
        axis="xy"
        xmin={100}
        xmax={360}
        ymin={100}
        ymax={360}
        x={state.x}
        y={state.y}
        onChange={setState}
      />
      <Slider
        axis="x"
        xmin={100}
        xmax={360}
        x={state.x}
        onChange={({ x }) => setState({ ...state, x })}
      />
      <Slider
        axis="y"
        ymin={100}
        ymax={360}
        y={state.y}
        onChange={({ y }) => setState({ ...state, y })}
      />
    </Fragment>
  );
};

export const XYExample = () => {
  const [state, setState] = useState({ x: 21, y: 73 });

  return (
    <Fragment>
      <div>{'x: ' + state.x}</div>
      <div>{'y: ' + state.y}</div>
      <Slider
        axis="xy"
        xmax={100}
        ymax={100}
        x={state.x}
        y={state.y}
        onDragEnd={() => console.log('drag end')}
        onChange={setState}
      />
    </Fragment>
  );
};

export const XExample = () => {
  const [state, setState] = useState({ x: 0.3 });

  return (
    <Fragment>
      <div>{'x: ' + state.x}</div>
      <Slider
        axis="x"
        xstep={0.1}
        xmin={0}
        xmax={1}
        x={state.x}
        onChange={({ x }) => setState({ x: parseFloat(x.toFixed(2)) })}
      />
    </Fragment>
  );
};

export const YExample = () => {
  const [state, setState] = useState({ y: 120 });

  return (
    <Fragment>
      <div>{'y: ' + state.y}</div>
      <Slider axis="y" ymin={100} ymax={360} y={state.y} onChange={setState} />
    </Fragment>
  );
};

export const ReverseExample = () => {
  const [state, setState] = useState({ x: 120, y: 120 });

  return (
    <Fragment>
      <div>{'x: ' + state.x}</div>
      <div>{'y: ' + state.y}</div>
      <Slider
        axis="xy"
        xmin={100}
        xmax={360}
        ymin={100}
        ymax={360}
        x={state.x}
        y={state.y}
        onChange={setState}
        reverse
      />
      <Slider
        axis="x"
        xmin={100}
        xmax={360}
        x={state.x}
        onChange={({ x }) => setState({ ...state, x })}
        reverse
      />
      <Slider
        axis="y"
        ymin={100}
        ymax={360}
        y={state.y}
        onChange={({ y }) => setState({ ...state, y })}
        reverse
      />
    </Fragment>
  );
};

export const CustomExample = () => {
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);

  return (
    <Fragment>
      <Slider
        x={x}
        onChange={({ x }) => setX(x)}
        xmin={100}
        xmax={360}
        styles={{
          track: {
            backgroundColor: 'blue'
          },
          active: {
            backgroundColor: 'red'
          },
          thumb: {
            width: 20,
            height: 40,
            opacity: 0.8
          }
        }}
      />
      <Slider
        axis="y"
        y={y}
        onChange={({ y }) => setY(y)}
        ymin={100}
        ymax={360}
        styles={{
          track: {
            backgroundColor: 'blue'
          },
          active: {
            backgroundColor: 'red'
          },
          thumb: {
            width: 20,
            height: 40,
            opacity: 0.8
          }
        }}
      />
    </Fragment>
  );
};

export const DisabledExample = () => {
  const [state, setState] = useState({ x: 10 });
  const [disabled, setDisabled] = useState(true);

  return (
    <Fragment>
      <div>{'x: ' + state.x}</div>
      <div>{'disabled: ' + disabled}</div>
      <input
        type="checkbox"
        checked={disabled}
        onChange={e => setDisabled(e.target.checked)}
      />
      <div>
        <Slider
          disabled={disabled}
          axis="x"
          x={state.x}
          onChange={({ x }) => setState({ x: parseFloat(x.toFixed(2)) })}
        />
      </div>
    </Fragment>
  );
};
