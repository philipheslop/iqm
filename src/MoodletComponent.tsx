import { Moodlet } from "./mockApi";

export interface MoodletComponentProps {
  moodlet: Moodlet;
  isFullWord: boolean;
}

export const MoodletComponent: React.FC<MoodletComponentProps> = ({
  moodlet,
  isFullWord,
}) => {
  return (
    <div className="moodlet-card">
      <div>
        {moodlet.id}
        {isFullWord ? moodlet.name : moodlet.name[0]}
        {moodlet.state}
      </div>
    </div>
  );
};
