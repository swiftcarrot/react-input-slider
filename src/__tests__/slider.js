import React from 'react';
import renderer from 'react-test-renderer';
import Slider from '../slider';

test('x', () => {
  const component = renderer.create(<Slider />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
    <div
      className="css-mcm35l"
      onClick={[Function]}
    >
      <div
        className="css-c5m0sj"
        style={
          Object {
            "width": "50%",
          }
        }
      />
      <div
        className="css-12efcmn"
        onClick={[Function]}
        onMouseDown={[Function]}
        onTouchStart={[Function]}
        style={
          Object {
            "left": "50%",
            "top": "0%",
          }
        }
      >
        <div
          className="css-8h56vq"
        />
      </div>
    </div>
  `);
});

test('y', () => {
  const component = renderer.create(<Slider axis="y" />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
    <div
      className="css-1munbi2"
      onClick={[Function]}
    >
      <div
        className="css-ee7l6q"
        style={
          Object {
            "height": "50%",
          }
        }
      />
      <div
        className="css-12efcmn"
        onClick={[Function]}
        onMouseDown={[Function]}
        onTouchStart={[Function]}
        style={
          Object {
            "left": "0%",
            "top": "50%",
          }
        }
      >
        <div
          className="css-1r0j9sa"
        />
      </div>
    </div>
  `);
});

test('xy', () => {
  const component = renderer.create(<Slider axis="xy" />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
    <div
      className="css-1rhaxo2"
      onClick={[Function]}
    >
      <div
        className="css-0"
        style={Object {}}
      />
      <div
        className="css-12efcmn"
        onClick={[Function]}
        onMouseDown={[Function]}
        onTouchStart={[Function]}
        style={
          Object {
            "left": "50%",
            "top": "50%",
          }
        }
      >
        <div
          className="css-avefca"
        />
      </div>
    </div>
  `);
});
