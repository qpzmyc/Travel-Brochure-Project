export interface MonthData {
  month: string;
  monthIndex: number; // 0-11 or 1-12 depending on math model
  temp: number; // Celsius
  sunlight: number; // Hours
}

export interface Attraction {
  id: string;
  name: string;
  image: string;
  description: string;
  bestMonthIndex: number; // 0 for Jan, 6 for July
  mathRelation: string; // Explanation relating to the graph
}

export interface TrigEquation {
  type: 'sine' | 'cosine';
  A: number; // Amplitude
  B: number; // Frequency coefficient
  C: number; // Phase shift
  D: number; // Vertical shift
  label: string;
}

export interface Source {
  name: string;
  url: string;
}