import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterU: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 0 V20 A10 10 0 0 0 20 30 V0" stroke="white" fill="transparent" />
  </g>
);

export default LetterU;
