import Sidebar from "@/app/components/Sidebar";
import SynestheticInstrument from "@/app/explore/6/CustomPixel";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Synesthetic Instrument"
        taskDetails={
          "We need to use an alternative pixel rather than the default one."
        }
        technologies="React, canvas, typescript abd simplex-noise."
        closingThoughts="Hexagons are the bestagons."
      />
      <SynestheticInstrument />
    </>
  );
}
