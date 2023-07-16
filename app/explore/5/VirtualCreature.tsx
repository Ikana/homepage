'use client'

import React, { useEffect, useState, useRef } from 'react';

const CELL_SIZE = 10; // You can adjust this for bigger or smaller cells
const ALIVE = 'white';
const DEAD = 'black';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cells, setCells] = useState(Array(Math.floor(window.innerHeight / CELL_SIZE)).fill(Array(Math.floor(window.innerWidth / CELL_SIZE)).fill(false)));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[y].length; x++) {
          context.fillStyle = cells[y][x] ? ALIVE : DEAD;
          context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    };

    const step = () => {
      let newCells = JSON.parse(JSON.stringify(cells));
      for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[y].length; x++) {
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              let newX = x + j;
              let newY = y + i;
              if (newX >= 0 && newY >= 0 && newY < cells.length && newX < cells[y].length) {
                neighbors += cells[newY][newX] ? 1 : 0;
              }
            }
          }

          if (cells[y][x] && (neighbors < 2 || neighbors > 3)) {
            newCells[y][x] = false;
          } else if (!cells[y][x] && neighbors === 3) {
            newCells[y][x] = true;
          }
        }
      }
      setCells(newCells);
    };

    render();

    const intervalId = setInterval(() => {
      step();
      render();
    }, 1000); // Adjust this for faster or slower steps

    return () => clearInterval(intervalId);
  }, [cells]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas onClick={e => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = Math.floor((e.clientX - (rect?.left ?? 0)) / CELL_SIZE);
        const y = Math.floor((e.clientY - (rect?.top ?? 0)) / CELL_SIZE);
        let newCells = JSON.parse(JSON.stringify(cells));
        newCells[y][x] = !newCells[y][x];
        setCells(newCells);
      }} ref={canvasRef} className="w-full h-full">
        {/* Fallback content for browsers that don't support Canvas */}
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
