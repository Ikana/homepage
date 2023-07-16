'use client'

import React, { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>();
  
  const A_REF = useRef(0);
  const B_REF = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const R1 = 0.5;  // make the donut smaller
      const R2 = 1;
      const K2 = 5;
      const K1 = canvas.width * K2 * 2 / (8 * (R1 + R2)); // reduced from 3 to 2

      A_REF.current += 0.01; // make rotation slower
      B_REF.current += 0.005;

      const cA=Math.cos(A_REF.current), sA=Math.sin(A_REF.current),
          cB=Math.cos(B_REF.current), sB=Math.sin(B_REF.current);
      for(let j=0;j<6.28;j+=0.3) {
        const ct=Math.cos(j),st=Math.sin(j);
        for(let i=0;i<6.28;i+=0.1) {
          const sp=Math.sin(i),cp=Math.cos(i);
          const ox = R2 + R1*ct, oy = R1*st;
          const x = ox*(cB*cp + sA*sB*sp) - oy*cA*sB;
          const y = ox*(sB*cp - sA*cB*sp) + oy*cA*cB;
          const ooz = 1/(K2 + cA*ox*sp + sA*oy);
          const xp=(canvas.width/2 + K1*ooz*x);
          const yp=(canvas.height/2 - K1*ooz*y);
          const L=0.9*(cp*ct*sB - cA*ct*sp - sA*st + cB*(cA*st - ct*sA*sp));  // increase brightness
          if(L > 0) {
            context.fillStyle = 'rgba(255,255,255,'+L+')';
            context.fillRect(xp, yp, 1.5, 1.5);
          }
        }
      }

      requestRef.current = requestAnimationFrame(renderFrame);
    };

    requestRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full">
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
