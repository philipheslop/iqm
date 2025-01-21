import mockData from "./mockData.json";

let moodletData = mockData;

export type Moodlet = {
  id: number;
  name: string;
  state: string;
};

export const getMoodlets = () =>
  new Promise<Moodlet[]>((resolve, reject) => {
    if (!moodletData) reject(new Error("Moodlets not found"));
    resolve(Object.values(moodletData));
  });
