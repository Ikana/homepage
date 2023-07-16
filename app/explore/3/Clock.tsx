"use client";

import React, { useEffect, useState } from "react";
import {
  TallyOne,
  TallyTwo,
  TallyThree,
  TallyFour,
  TallyFive,
  TallyTen,
} from "./TallyMarks";

const tallyComponents = [
  TallyOne,
  TallyTwo,
  TallyThree,
  TallyFour,
  TallyFive,
  TallyTen,
];

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false); // New state variable


  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isClient) {
    return null;
  }  

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hoursInTally = [];
  const minutesInTally = [];
  const secondsInTally = [];

  for (let i = 0; i < Math.floor(hours / 5); i++) {
    hoursInTally.push(<TallyFive key={i} />);
  }

  const TallyHour = tallyComponents[hours % 5];
  hoursInTally.push(<TallyHour key="hour" />);

  for (let i = 0; i < Math.floor(minutes / 5); i++) {
    minutesInTally.push(<TallyFive key={i} />);
  }

  const TallyMinute = tallyComponents[minutes % 5];
  minutesInTally.push(<TallyMinute key="minute" />);

  for (let i = 0; i < Math.floor(seconds / 5); i++) {
    secondsInTally.push(<TallyFive key={i} />);
  }

  const TallySecond = tallyComponents[seconds % 5];
  secondsInTally.push(<TallySecond key="second" />);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="border border-black p-4 rounded">
        <div className="mb-4 text-2xl">Hours</div>
        <div className="flex justify-center">{hoursInTally}</div>
      </div>
      <div className="border border-black p-4 rounded">
        <div className="mb-4 text-2xl">Minutes</div>
        <div className="flex justify-center">{minutesInTally}</div>
      </div>
      <div className="border border-black p-4 rounded">
        <div className="mb-4 text-2xl">Seconds</div>
        <div className="flex justify-center">{secondsInTally}</div>
      </div>
    </div>
  );
}
