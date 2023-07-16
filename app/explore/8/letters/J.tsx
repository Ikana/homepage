import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterJ: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M20 0 V20 A10 10 0 0 1 10 30 H0" stroke="white" fill="transparent" />
  </g>
);

export default LetterJ
