import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterR: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 30 V0 H15 A15 15 0 0 1 0 15 L30 30" stroke="white" fill="transparent" />
  </g>
);

export default LetterR;
