import Sidebar from "@/app/components/Sidebar";
import SynestheticInstrument from "@/app/explore/4/GenerativeLandscape";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Generative Landscape"
        taskDetails={
          "The task is to create a landspace using generative art."
        }
        technologies="I used html5 canvas typescript and symplex noise."
        closingThoughts="The project was originally meant to create a landscape like a street map or like a mountain. But I decided to make it more like a circuit board, everytime I saw a PCB I thought it looked like a street map."
      />
      <SynestheticInstrument />
    </>
  );
}
