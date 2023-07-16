import Sidebar from "@/app/components/Sidebar";
import AugmentedProjections from "@/app/explore/10/AugmentedProjections";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Augmented Projections"
        taskDetails={
          "The task was to projecct something into the real world."
        }
        technologies="React and canvas."
        closingThoughts="I decided to limit this project to the web, and I decided to translte the famous donut.c program into typescript and react."
      />
      <AugmentedProjections />
    </>
  );
}
