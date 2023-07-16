import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterD: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 0 V30 M0 30 C20 30 20 0 0 0" stroke="white" fill="transparent" />
  </g>
);

export default LetterD;
