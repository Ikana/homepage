import Sidebar from "@/app/components/Sidebar";
import OneButtonGame from "@/app/explore/11/OneButtonGame";

export default function Example() {
  return (
    <>
      <Sidebar
        title="One Button Game"
        taskDetails={
          "We have to create game that only uses one button."
        }
        technologies="React Canvas"
        closingThoughts="Here the objective of the game is to eat as many triangles as possible."
      />
      <OneButtonGame />
    </>
  );
}
