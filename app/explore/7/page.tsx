import Sidebar from "@/app/components/Sidebar";
import DrawingMachine from "@/app/explore/7/DrawingMachine";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Drawing Machine"
        taskDetails={
          "We have to create a machine that draws using an novel way to control what we draw."
        }
        technologies="React, requestAnimation frame, canvas, 4dnoise"
        closingThoughts="For this I decided to use 4d noise to control the hue and thickness of the line. I also used the noise to control the movement of the stylus."
      />
      <DrawingMachine />
    </>
  );
}
