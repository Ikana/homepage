import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterN: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 30 V0 L30 30 V0" stroke="white" fill="transparent" />
  </g>
);

export default LetterN;
