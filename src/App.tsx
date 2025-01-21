import React from "react";
import "./styles.css";
import { getMoodlets, Moodlet } from "./mockApi";

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
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );

  return (
    <div>
      <ul>
        {moodlets.map((moodlet) => {
          return (
            <li key={moodlet.id}>
              {moodlet.id} {moodlet.name} {moodlet.state}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
