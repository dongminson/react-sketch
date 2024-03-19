import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ReactSketch = props => {
  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const contextRef = useRef(null);
  const boundingBoxRef = useRef(null);
  useEffect(() => {
    var _canvasRef$current;
    const {
      brushCol,
      lineWidth
    } = props;
    const context = (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
    const canvas = canvasRef.current;
    if (context && canvas) {
      context.lineWidth = lineWidth;
      context.strokeStyle = brushCol;
      context.lineJoin = context.lineCap = 'round';
      contextRef.current = context;
      boundingBoxRef.current = canvas.getBoundingClientRect();
    }
  }, []);
  const mouseDownHandler = e => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    setMouseDown(true);
    if (!canvas) {
      return;
    }
    const boundingBox = boundingBoxRef.current;
    if (context && boundingBox) {
      context.moveTo((e.pageX || e.touches[0].pageX) - boundingBox.left, (e.pageY || e.touches[0].pageY) - boundingBox.top);
    }
  };
  const mouseUpHandler = () => setMouseDown(false);
  const mouseMoveHandler = e => {
    if (mouseDown) {
      var _e$touches, _e$touches2;
      const context = contextRef.current;
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const boundingBox = boundingBoxRef.current;
      if (e.touches) e.preventDefault();
      if ((e.pageX || ((_e$touches = e.touches) === null || _e$touches === void 0 || (_e$touches = _e$touches[0]) === null || _e$touches === void 0 ? void 0 : _e$touches.pageX)) > 0 && (e.pageY || ((_e$touches2 = e.touches) === null || _e$touches2 === void 0 || (_e$touches2 = _e$touches2[0]) === null || _e$touches2 === void 0 ? void 0 : _e$touches2.pageY)) < props.height) {
        if (context && boundingBox) {
          context.lineTo((e.pageX || e.touches[0].pageX) - boundingBox.left, (e.pageY || e.touches[0].pageY) - boundingBox.top);
          context.stroke();
        }
      }
    }
  };
  const {
    width,
    height,
    onDraw,
    style,
    className
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: "".concat(className, "__canvas"),
    width: width,
    height: height,
    onClick: onDraw,
    onMouseDown: mouseDownHandler,
    onTouchStart: mouseDownHandler,
    onMouseUp: mouseUpHandler,
    onTouchEnd: mouseUpHandler,
    onMouseMove: mouseMoveHandler,
    onTouchMove: mouseMoveHandler,
    style: {
      ...style,
      width: props.width,
      height: props.height
    }
  }));
};
ReactSketch.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onDraw: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  brushCol: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired
};
ReactSketch.defaultProps = {
  className: 'sketch',
  style: {
    background: '#ffffff'
  },
  width: 800,
  height: 600,
  brushCol: '#000000',
  lineWidth: 5,
  onDraw: () => {}
};
var ReactSketch$1 = ReactSketch;

export { ReactSketch$1 as ReactSketch };
