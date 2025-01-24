import React from "react";
import "./App.css";
import {
  getMoodlets,
  getMoodletStates,
  Moodlet,
  MoodletState,
} from "./mockApi";
import { MoodletComponent } from "./MoodletComponent";

export default function App() {
  //States for data from mockApi - allowing a data driven approach to defining moodlets, states etc.
  const [moodlets, setMoodlets] = React.useState<Moodlet[] | null>(null);
  const [moodletStates, setMoodletStates] = React.useState<
    MoodletState[] | null
  >(null);

  //Using a single useEffect to fetch data - this would be a proper fetch but just using mock for now
  //Also, this may work better with different useEffect for each fetch if dependancies are different
  React.useEffect(() => {
    const doGetMoodlets = async () => {
      const result = await getMoodlets();
      setMoodlets(result);
    };
    const doGetMoodletStates = async () => {
      const result = await getMoodletStates();
      setMoodletStates(result);
    };
    doGetMoodlets();
    doGetMoodletStates();
  }, []);

  if (!moodlets || !moodletStates)
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
              key={moodlet.id}
              moodlet={moodlet}
              moodletStates={moodletStates}
              isFullWord={true}
            ></MoodletComponent>
          );
        })}
      </ul>
    </div>
  );
}
