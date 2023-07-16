import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterE: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <line x1="0" y1="0" x2="0" y2="30" stroke="white" />
    <line x1="0" y1="0" x2="30" y2="0" stroke="white" />
    <line x1="0" y1="15" x2="20" y2="15" stroke="white" />
    <line x1="0" y1="30" x2="30" y2="30" stroke="white" />
  </g>
);

export default LetterE;
