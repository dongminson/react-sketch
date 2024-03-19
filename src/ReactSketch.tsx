import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export interface ReactSketchProps {
  width: number;
  height: number;
  onDraw?: () => void;
  style?: React.CSSProperties;
  className?: string;
  brushCol: string;
  lineWidth: number;
}

const ReactSketch: React.FC<ReactSketchProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const boundingBoxRef = useRef<DOMRect | null>(null); 

  useEffect(() => {
    const { brushCol, lineWidth } = props;

    const context = canvasRef.current?.getContext('2d');
    const canvas = canvasRef.current;

    if (context && canvas) {
      context.lineWidth = lineWidth;
      context.strokeStyle = brushCol;
      context.lineJoin = context.lineCap = 'round';
      contextRef.current = context;
      boundingBoxRef.current = canvas.getBoundingClientRect();
    }
  }, []);

  const mouseDownHandler = (e: any) => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    setMouseDown(true);

    if(!canvas) {
      return;
    }
    const boundingBox = boundingBoxRef.current;
    if (context && boundingBox) {
      context.moveTo(
        (e.pageX || e.touches[0].pageX) - boundingBox.left,
        (e.pageY || e.touches[0].pageY) - boundingBox.top
      );
    }
  };

  const mouseUpHandler = () => setMouseDown(false);

  const mouseMoveHandler = (e: any) => {
    if (mouseDown) {
      const context = contextRef.current;
      const canvas = canvasRef.current;
      if(!canvas) {
        return;
      }
      const boundingBox = boundingBoxRef.current;
      if (e.touches) e.preventDefault();

      if (
        (e.pageX || e.touches?.[0]?.pageX) > 0 &&
        (e.pageY || e.touches?.[0]?.pageY) < props.height
      ) {
        if (context && boundingBox) {
          context.lineTo(
            (e.pageX || e.touches[0].pageX) - boundingBox.left,
            (e.pageY || e.touches[0].pageY) - boundingBox.top
          );
          context.stroke();
        }
      }
    }
  };

  const { width, height, onDraw, style, className } = props;

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className={`${className}__canvas`}
        width={width}
        height={height}
        onClick={onDraw}
        onMouseDown={mouseDownHandler}
        onTouchStart={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onTouchEnd={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onTouchMove={mouseMoveHandler}
        style={{
          ...style,
          width: props.width,
          height: props.height,
        }}
      />
    </div>
  );
};

ReactSketch.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onDraw: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  brushCol: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
};
  
ReactSketch.defaultProps = {
  className: 'sketch',
  style: {
    background: '#ffffff',
  },
  width: 800,
  height: 600,
  brushCol: '#000000',
  lineWidth: 5,
  onDraw: () => {},
};

export default ReactSketch;
