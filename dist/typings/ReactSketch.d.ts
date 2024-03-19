import React from 'react';
export interface ReactSketchProps {
    width: number;
    height: number;
    onDraw?: () => void;
    style?: React.CSSProperties;
    className?: string;
    brushCol: string;
    lineWidth: number;
}
declare const ReactSketch: React.FC<ReactSketchProps>;
export default ReactSketch;
