import Sidebar from "@/app/components/Sidebar";
import FaceGenerator from "@/app/explore/2/FaceGenerator";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Face generator"
        taskDetails={
          "The task is to generates faces having at least three dimensions of variability."
        }
        technologies="Here I used Canvas API to draw faces. I used Perlin noise to add variability to the size and position of the face elements."
        closingThoughts="This one was a simple one I dind't want to spend to much time drawing complicated faces but I'm happy with the result."
      />
      <FaceGenerator />
    </>
  );
}
