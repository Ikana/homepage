import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterW: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M0 0 L10 30 L20 0 L30 30 L40 0" stroke="white" fill="transparent" />
  </g>
);

export default LetterW;
