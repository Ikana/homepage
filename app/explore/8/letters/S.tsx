import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterS: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M30 0 C30 15 0 15 0 30 C0 15 30 15 30 0" stroke="white" fill="transparent" />
  </g>
);

export default LetterS;
