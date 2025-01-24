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
  const [fullWord, setFullWord] = React.useState<boolean>(true);
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
    console.log("useEffect running");
    doGetMoodlets();
    doGetMoodletStates();
  }, []);

  const moodletStateHandler = (id: number, newState: string) => {
    if (moodlets) {
      setMoodlets(
        moodlets.map((moodlet: Moodlet) => {
          return moodlet.id === id
            ? {
                ...moodlet,
                state: newState,
              }
            : moodlet;
        })
      );
    }
  };

  if (!moodlets || !moodletStates)
    return (
      <div className="App">
        <h1>No Moodlets Loaded</h1>
      </div>
    );

  return (
    <div className="App">
      Use Full Text:
      <label className="switch">
        <input
          type="checkbox"
          checked={fullWord}
          onChange={() => setFullWord(!fullWord)}
        />
        <span className="slider round"></span>
      </label>
      <ul>
        {moodlets.map((moodlet) => {
          return (
            <MoodletComponent
              key={moodlet.id}
              moodletStateHandler={moodletStateHandler}
              moodlet={moodlet}
              moodletStates={moodletStates}
              isFullWord={fullWord}
            ></MoodletComponent>
          );
        })}
      </ul>
    </div>
  );
}
