import React, { MouseEvent } from "react";
import { Moodlet, MoodletState, Transition } from "./mockApi";
import "./MoodletComponent.css";

export interface MoodletComponentProps {
  moodlet: Moodlet;
  moodletStates: MoodletState[];
  moodletStateHandler: (id: number, state: string) => void;
  isFullWord: boolean;
}

const openedStyle = {
  maxWidth: "100%",
};

const closedStyle = {
  maxWidth: 0,
};

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

  let moodletFullStyle = {
    "--moodlet-colour": getCurrentState()?.bgcolour,
    "--moodlet-border-colour": getCurrentState()?.bordercolour,
    "--moodlet-text-colour": getCurrentState()?.textcolour,
    width: "100px",
    transition: "width 0.15s ease-out",
  };

  let moodletInitialStyle = {
    "--moodlet-colour": getCurrentState()?.bgcolour,
    "--moodlet-border-colour": getCurrentState()?.bordercolour,
    "--moodlet-text-colour": getCurrentState()?.textcolour,
    width: "20px",
    transition: "width 0.25s ease-in",
  };

  return (
    <div
      style={
        isFullWord
          ? moodletFullStyle
          : (moodletInitialStyle as React.CSSProperties)
      }
      className={`moodlet`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {isFullWord ? moodlet.name : moodlet.name[0]}
    </div>
  );
};
