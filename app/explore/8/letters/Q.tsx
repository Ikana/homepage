import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterQ: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="15" cy="15" r="15" stroke="white" fill="transparent" />
    <line x1="15" y1="15" x2="30" y2="30" stroke="white" />
  </g>
);

export default LetterQ;
