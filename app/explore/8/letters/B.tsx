import React from "react";

interface Props {
  x: number;
  y: number;
}
const LetterB: React.FC<Props> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="15" cy="10" r="10" stroke="white" fill="transparent" />
    <circle cx="15" cy="20" r="10" stroke="white" fill="transparent" />
    <line x1="0" y1="0" x2="0" y2="30" stroke="white" />
  </g>
);

export default LetterB;
