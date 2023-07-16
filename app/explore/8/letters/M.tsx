import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterM: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 30 V0 L15 15 L30 0 V30" stroke="white" fill="transparent" />
  </g>
);

export default LetterM;
