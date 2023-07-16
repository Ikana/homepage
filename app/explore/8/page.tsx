import Sidebar from "@/app/components/Sidebar";
import ModularAlphabet from "@/app/explore/8/ModularAlphabet";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Synesthetic Instrument"
        taskDetails={
          "Create a modular alphabet based on a common theme."
        }
        technologies="TSX and SVG."
        closingThoughts="For this I decided to use primitive SVG components to create a modular alphabet. I used a grid to display the letters."
      />
      <ModularAlphabet />
    </>
  );
}
