import Sidebar from "@/app/components/Sidebar";

import Clock from "@/app/explore/3/Clock";

export default function ClockPage() {
  return (
    <>
      <Sidebar
        title="Clock"
        taskDetails={"The task is to create a novel visual clock without using numerals."}
        technologies="For this only used react and css."
        closingThoughts="Originally I wanted to do one book quote per minute of the day but I couldn't find enough quotes. So I decided to do tally marks, I was inspired by all the works where someone is prision and they mark the days on the wall."
      />
      <Clock />
    </>
  );
}
