import Sidebar from "@/app/components/Sidebar";
import SynestheticInstrument from "@/app/explore/5/VirtualCreature";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Virtual Creature"
        taskDetails={
          "This taks is to create a digital creature that can move and interact with the user."
        }
        technologies="Canvas reac and typescript."
        closingThoughts="For this I decided to go a bit vintage and I implemented conways game of life on the HTML5 canvas."
      />
      <SynestheticInstrument />
    </>
  );
}
