import React, { MouseEvent } from "react";
import { Moodlet, MoodletState, Transition } from "./mockApi";
import "./MoodletComponent.css";

export interface MoodletComponentProps {
  moodlet: Moodlet;
  moodletStates: MoodletState[];
  moodletStateHandler: (id: number, state: string) => void;
  isFullWord: boolean;
}

export const MoodletComponent: React.FC<MoodletComponentProps> = ({
  moodlet,
  moodletStateHandler,
  moodletStates,
  isFullWord,
}) => {
  const getCurrentState = (): MoodletState | undefined => {
    return moodletStates.find(
      (state: MoodletState) => state.name === moodlet.state
    );
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    let currentState = getCurrentState();
    if (currentState) {
      let transition = null;
      switch (event.type) {
        case "click":
          transition = currentState.transitions.find(
            (t: Transition) => t.action === "leftclick"
          );
          break;
        case "contextmenu":
          transition = currentState.transitions.find(
            (t: Transition) => t.action === "rightclick"
          );
          break;
      }
      transition ? moodletStateHandler(moodlet.id, transition.result) : null;
    }
  };

  return (
    <div>
      <div
        style={
          {
            "--moodlet-colour": getCurrentState()?.bgcolour,
            "--moodlet-border-colour": getCurrentState()?.bordercolour,
            "--moodlet-text-colour": getCurrentState()?.textcolour,
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
    </div>
  );
};
