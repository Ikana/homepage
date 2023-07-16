import React from 'react';

interface Props {
  x: number;
  y: number;
}

const LetterO: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="15" cy="15" r="15" stroke="white" fill="transparent" />
  </g>
);

export default LetterO;
