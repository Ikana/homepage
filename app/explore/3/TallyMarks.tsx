import React from 'react';

const TallyOne = () => <div className="font-mono text-9xl">𝍠</div>;

const TallyTwo = () => <div className="font-mono text-9xl">𝍡</div>;

const TallyThree = () => <div className="font-mono text-9xl">𝍢</div>;

const TallyFour = () => <div className="font-mono text-9xl">𝍣</div>;

const TallyFive = () => (
  <div className="relative inline-flex items-center">
    <div className="font-mono text-9xl">𝍣</div>
    <div style={{ top: '60%', transform: 'translate(-50%, -50%) rotate(12deg)' }} className="absolute left-1/2 text-8xl font-mono">
      /
    </div>
  </div>
);

const TallyTen = () => <div className="font-mono text-9xl">▪️</div>;

export { TallyOne, TallyTwo, TallyThree, TallyFour, TallyFive, TallyTen };
