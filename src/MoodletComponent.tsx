import React, { MouseEvent } from "react";
import { Moodlet, MoodletState, Transition } from "./mockApi";
import "./MoodletComponent.css";

export interface MoodletComponentProps {
  moodlet: Moodlet;
  moodletStates: MoodletState[];
  isFullWord: boolean;
}

export const MoodletComponent: React.FC<MoodletComponentProps> = ({
  moodlet,
  moodletStates,
  isFullWord,
}) => {
  const handleClick = React.useCallback((event: MouseEvent) => {
    event.preventDefault();
    console.log("handleclick");
    console.log(moodlet);
    let currentState: MoodletState | undefined = moodletStates.find(
      (state: MoodletState) => state.name === moodlet.state
    );
    if (currentState) {
      let transition = null;
      switch (event.type) {
        case "click":
          transition = currentState.transitions.find(
            (transition: Transition) => transition.action === "leftclick"
          );
          transition ? (moodlet.state = transition.result) : null;
          break;
        case "contextmenu":
          transition = currentState.transitions.find(
            (transition: Transition) => transition.action === "rightclick"
          );
          transition ? (moodlet.state = transition.result) : null;
          break;
      }
      console.log(moodlet);
    }
  }, []);

  console.log("handleclick");

  return (
    <div
      style={
        {
          "--moodlet-colour": moodlet.state === "required" ? "black" : "grey",
          "--moodlet-border-colour":
            moodlet.state === "required" ? "red" : "blue",
        } as React.CSSProperties
      }
      className={`moodlet ${
        isFullWord ? "moodlet-fullword" : "moodlet-not-fullword"
      }`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {isFullWord ? moodlet.name : moodlet.name[0]}
    </div>
  );
};
