import React from "react";
import LetterA from "./letters/A";
import LetterB from "./letters/B";
import LetterC from "./letters/C";
import LetterD from "./letters/D";
import LetterE from "./letters/E";
import LetterF from "./letters/F";
import LetterG from "./letters/G";
import LetterH from "./letters/H";
import LetterI from "./letters/I";
import LetterJ from "./letters/J";
import LetterK from "./letters/K";
import LetterL from "./letters/L";
import LetterM from "./letters/M";
import LetterN from "./letters/N";
import LetterO from "./letters/O";
import LetterP from "./letters/P";
import LetterQ from "./letters/Q";
import LetterR from "./letters/R";
import LetterS from "./letters/S";
import LetterT from "./letters/T";
import LetterU from "./letters/U";
import LetterV from "./letters/V";
import LetterW from "./letters/W";
import LetterX from "./letters/X";
import LetterY from "./letters/Y";
import LetterZ from "./letters/Z";

const letters = [
  LetterA,
  LetterB,
  LetterC,
  LetterD,
  LetterE,
  LetterF,
  LetterG,
  LetterH,
  LetterI,
  LetterJ,
  LetterK,
  LetterL,
  LetterM,
  LetterN,
  LetterO,
  LetterP,
  LetterQ,
  LetterR,
  LetterS,
  LetterT,
  LetterU,
  LetterV,
  LetterW,
  LetterX,
  LetterY,
  LetterZ,
]; // Add more letters here

export default function Canvas() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="grid grid-cols-3 gap-0">
        {" "}
        {/* Reduce gap and adjust grid-cols-* according to the number of columns you need */}
        {letters.map((Letter, index) => (
          <div key={index}>
            <svg width="100" height="100" fill="white">
              {" "}
              {/* Reduce SVG size */}
              <Letter x={0} y={0} /> {/* Adjust letter position */}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
