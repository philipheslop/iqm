import { Moodlet } from "./mockApi";
import "./MoodletComponent.css";

export interface MoodletComponentProps {
  moodlet: Moodlet;
  isFullWord: boolean;
}

export const MoodletComponent: React.FC<MoodletComponentProps> = ({
  moodlet,
  isFullWord,
}) => {
  return (
    <div
      className={`moodlet ${
        isFullWord ? "moodlet-fullword" : "moodlet-not-fullword"
      }`}
    >
      {isFullWord ? moodlet.name : moodlet.name[0]}
    </div>
  );
};
