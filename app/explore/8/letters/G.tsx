import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterG: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M30 0 A30 30 0 0 1 0 15 A30 30 0 0 1 30 30 L30 15 L20 15" stroke="white" fill="transparent" />
  </g>
);

export default LetterG;
