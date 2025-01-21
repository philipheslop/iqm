import React from "react";
import "./App.css";
import { getMoodlets, Moodlet } from "./mockApi";
import { MoodletComponent } from "./MoodletComponent";

export default function App() {
  const [moodlets, setMoodlets] = React.useState<Moodlet[] | null>(null);
  React.useEffect(() => {
    const doGetMoodlets = async () => {
      const result = await getMoodlets();
      setMoodlets(result);
    };
    doGetMoodlets();
  }, []);

  if (!moodlets)
    return (
      <div className="App">
        <h1>No Moodlets Loaded</h1>
      </div>
    );

  return (
    <div className="App">
      <ul>
        {moodlets.map((moodlet) => {
          return (
            <MoodletComponent
              moodlet={moodlet}
              isFullWord={true}
            ></MoodletComponent>
          );
        })}
      </ul>
    </div>
  );
}
