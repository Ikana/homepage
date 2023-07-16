import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterI: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <line x1="15" y1="0" x2="15" y2="30" stroke="white" />
  </g>
);

export default LetterI;
