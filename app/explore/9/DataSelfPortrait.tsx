"use client";

import React, { useEffect, useRef } from "react";

import cloud from "d3-cloud";
import { min, max } from "d3-array";
import { scaleLinear, scaleSequential } from "d3-scale";
import { interpolateCubehelixDefault } from "d3-scale-chromatic";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

import genres from "@/app/explore/9/genre_counts.json";

interface Word {
  text: string;
  size: number;
  x?: number;
  y?: number;
  rotate?: number;
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const data: Word[] = Object.entries(genres).map(([key, value]) => ({
      text: key,
      size: value,
    }));

    const fontSize = scaleLinear()
      .domain([min(data, (d) => d.size) || 0, max(data, (d) => d.size) || 0])
      .range([20, 80]); // Change these values as needed

    const colorScale = scaleSequential(interpolateCubehelixDefault).domain([
      min(data, (d) => d.size) || 0,
      max(data, (d) => d.size) || 0,
    ]);

    const draw = (words: Word[]) => {
      words.forEach((d, i) => {
        context.save();
        context.translate(
          (d.x || 0) + canvas.width / 2,
          (d.y || 0) + canvas.height / 2
        );
        context.rotate(((d.rotate || 0) * Math.PI) / 180);
        context.textAlign = "center";
        context.fillStyle = colorScale(d.size);  // Use the color scale to determine the fill color
        context.font = `${fontSize(d.size)}px ${urbanist.style.fontFamily}`;
        context.fillText(d.text, 0, 0);
        context.restore();
      });
    };

    cloud()
      .font(urbanist.style.fontFamily) // Set to your font's name
      .size([canvas.width * 0.8, canvas.height * 0.8]) // Create a buffer zone around the edges
      .words(data)
      .padding(10)
      .spiral("rectangular")
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact")
      .fontSize((d) => fontSize((d as Word).size))
      .on("end", draw)
      .start();
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full">
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}
