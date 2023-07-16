import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterV: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 0 L15 30 L30 0" stroke="white" fill="transparent" />
  </g>
);

export default LetterV;
