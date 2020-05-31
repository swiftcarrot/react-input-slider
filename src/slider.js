/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRef } from 'react';
import { getClientPosition } from './utils';
import defaultStyles from './styles';

const Slider = ({
  disabled,
  axis,
  x,
  y,
  xmin,
  xmax,
  ymin,
  ymax,
  xstep,
  ystep,
  onChange,
  onDragStart,
  onDragEnd,
  onAxisClick,
  onThumbClick,
  onThumbDoubleClick,
  xreverse,
  yreverse,
  styles: customStyles,
  ...props
}) => {
  const container = useRef(null);
  const handle = useRef(null);
  const start = useRef({});
  const offset = useRef({});

  function getPosition() {
    let top = ((y - ymin) / (ymax - ymin)) * 100;
    let left = ((x - xmin) / (xmax - xmin)) * 100;

    if (top > 100) top = 100;
    if (top < 0) top = 0;
    if (axis === 'x') top = 0;

    if (left > 100) left = 100;
    if (left < 0) left = 0;
    if (axis === 'y') left = 0;

    return { top, left };
  }

  function change({ top, left }) {
    if (!onChange) return;

    const { width, height } = container.current.getBoundingClientRect();
    let dx = 0;
    let dy = 0;

    if (left < 0) left = 0;
    if (left > width) left = width;
    if (top < 0) top = 0;
    if (top > height) top = height;

    if (axis === 'x' || axis === 'xy') {
      dx = (left / width) * (xmax - xmin);
    }

    if (axis === 'y' || axis === 'xy') {
      dy = (top / height) * (ymax - ymin);
    }

    const x = (dx !== 0 ? parseInt(dx / xstep, 10) * xstep : 0) + xmin;
    const y = (dy !== 0 ? parseInt(dy / ystep, 10) * ystep : 0) + ymin;

    onChange({
      x: xreverse ? xmax - x + xmin : x,
      y: yreverse ? ymax - y + ymin : y
    });
  }

  function handleMouseDown(e) {
    if (disabled) return;

    e.preventDefault();
    const dom = handle.current;
    const clientPos = getClientPosition(e);

    start.current = {
      x: dom.offsetLeft,
      y: dom.offsetTop
    };

    offset.current = {
      x: clientPos.x,
      y: clientPos.y
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('touchcancel', handleDragEnd);

    if (onDragStart) {
      onDragStart(e);
    }
  }

  function getPos(e) {
    const clientPos = getClientPosition(e);
    const left = clientPos.x + start.current.x - offset.current.x;
    const top = clientPos.y + start.current.y - offset.current.y;

    return { left, top };
  }

  function handleDrag(e) {
    if (disabled) return;

    e.preventDefault();
    change(getPos(e));
  }

  function handleDragEnd(e) {
    if (disabled) return;

    e.preventDefault();
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);

    document.removeEventListener('touchmove', handleDrag, {
      passive: false
    });
    document.removeEventListener('touchend', handleDragEnd);
    document.removeEventListener('touchcancel', handleDragEnd);

    if (onDragEnd) {
      onDragEnd(e);
    }
  }

  function handleClick(e) {
    if (disabled) return;

    const clientPos = getClientPosition(e);
    const rect = container.current.getBoundingClientRect();

    change({
      left: clientPos.x - rect.left,
      top: clientPos.y - rect.top
    });

    if (onAxisClick) onAxisClick(e);
  }

  // semantic alias for handleClick
  function handleAxisClick(e) {
    handleClick(e);
  }

  // on thumb (element) click 
  function handleThumbClick(e) {
    if (onThumbClick) onThumbClick(e);
  }

  // on thumb (element) double-click
  function handleThumbDoubleClick(e) {
    if (onThumbDoubleClick) onThumbDoubleClick(e);
  }

  const pos = getPosition();
  const valueStyle = {};
  if (axis === 'x') valueStyle.width = pos.left + '%';
  if (axis === 'y') valueStyle.height = pos.top + '%';
  if (xreverse) valueStyle.left = 100 - pos.left + '%';
  if (yreverse) valueStyle.top = 100 - pos.top + '%';

  const handleStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: xreverse ? 100 - pos.left + '%' : pos.left + '%',
    top: yreverse ? 100 - pos.top + '%' : pos.top + '%'
  };

  if (axis === 'x') {
    handleStyle.top = '50%';
  } else if (axis === 'y') {
    handleStyle.left = '50%';
  }

  const styles = {
    track: { ...defaultStyles[axis].track, ...customStyles.track },
    active: { ...defaultStyles[axis].active, ...customStyles.active },
    thumb: { ...defaultStyles[axis].thumb, ...customStyles.thumb },
    disabled: { ...defaultStyles.disabled, ...customStyles.disabled }
  };

  return (
    <div
      {...props}
      ref={container}
      css={[styles.track, disabled && styles.disabled]}
      onClick={handleClick}
    >
      <div css={styles.active} style={valueStyle} />
      <div
        ref={handle}
        style={handleStyle}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onClick={function(e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <div css={styles.thumb} />
      </div>
    </div>
  );
};

Slider.defaultProps = {
  disabled: false,
  axis: 'x',
  x: 50,
  xmin: 0,
  xmax: 100,
  y: 50,
  ymin: 0,
  ymax: 100,
  xstep: 1,
  ystep: 1,
  xreverse: false,
  yreverse: false,
  styles: {}
};

export default Slider;
