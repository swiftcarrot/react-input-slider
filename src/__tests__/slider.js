import React from 'react';
import renderer from 'react-test-renderer';
import Slider from '../slider';

test('x', () => {
  const component = renderer.create(<Slider />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
<div
  className="css-qt4p17-Slider"
  onClick={[Function]}
>
  <div
    className="css-1nz8439-Slider"
    style={
      Object {
        "width": "50%",
      }
    }
  />
  <div
    className="css-13grdxx-Slider"
    onClick={[Function]}
    onMouseDown={[Function]}
    onTouchStart={[Function]}
    style={
      Object {
        "left": "50%",
        "top": "0%",
      }
    }
  />
</div>
`);
});

test('y', () => {
  const component = renderer.create(<Slider axis="y" />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
<div
  className="css-1opy2ua-Slider"
  onClick={[Function]}
>
  <div
    className="css-5yhtds-Slider"
    style={
      Object {
        "height": "50%",
      }
    }
  />
  <div
    className="css-1j763rc-Slider"
    onClick={[Function]}
    onMouseDown={[Function]}
    onTouchStart={[Function]}
    style={
      Object {
        "left": "0%",
        "top": "50%",
      }
    }
  />
</div>
`);
});

test('xy', () => {
  const component = renderer.create(<Slider axis="xy" />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
<div
  className="css-8jucwj-Slider"
  onClick={[Function]}
>
  <div
    className="css-1kevm2j-Slider"
    style={Object {}}
  />
  <div
    className="css-1l5zdlt-Slider"
    onClick={[Function]}
    onMouseDown={[Function]}
    onTouchStart={[Function]}
    style={
      Object {
        "left": "50%",
        "top": "50%",
      }
    }
  />
</div>
`);
});
