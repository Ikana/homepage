import Sidebar from "@/app/components/Sidebar";
import IterativePattern from "@/app/explore/1/IterativePattern";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Iterative Pattern"
        taskDetails={
          "Here I have to write code to generate a tiling pattern that can reminisce of a textile. I will be using recursion to achieve the design."
        }
        technologies="I used TypeScript, React, and Canvas to create this pattern. Also used the Simplex Noise library to add some randomness to the pattern."
        closingThoughts="The pattern looked really stiff at first, but after adding some randomness to the size and position of the diamonds, it started to look more like a system of cells. But not quite like a textile. But I like it better this way."
      />
      <IterativePattern />
    </>
  );
}
