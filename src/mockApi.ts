import mockData from "./mockData.json";
import mockStateData from "./mockStateData.json";

let moodletData = mockData;
let moodletStateData = mockStateData;

export type Moodlet = {
  id: number;
  name: string;
  state: string;
};

export type MoodletState = {
  name: string;
  transitions: Transition[];
};

export type Transition = {
  action: string;
  result: string;
};

export const getMoodlets = () =>
  new Promise<Moodlet[]>((resolve, reject) => {
    if (!moodletData) reject(new Error("Moodlets not found"));
    resolve(Object.values(moodletData));
  });

export const getMoodletStates = () =>
  new Promise<MoodletState[]>((resolve, reject) => {
    if (!moodletStateData) reject(new Error("Moodlet States not found"));
    resolve(Object.values(moodletStateData));
  });
