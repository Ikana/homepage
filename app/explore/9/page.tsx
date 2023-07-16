import Sidebar from "@/app/components/Sidebar";
import DataSelfPortrait from "@/app/explore/9/DataSelfPortrait";

export default function Example() {
  return (
    <>
      <Sidebar
        title="Data Self Portrait"
        taskDetails={
          "Use your own data to create a visualization that represents you."
        }
        technologies="D3.js, React and GPT-4"
        closingThoughts="For this task I went to the good reads api to get all the books I've read. Then I passed that through the GPT-4 API to get the genre of the books. I then used D3.js to create a word cloud of the genres of books I've read."
      />
      <DataSelfPortrait />
    </>
  );
}
