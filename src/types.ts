export type Movie = {
  actors: string;
  director: string;
  genres: Genre[];
  id: number;
  plot: string;
  posterUrl: string;
  runtime: string;
  title: string;
  year: string;
};

export type Genre = string;

export type ShowType = "all" | "watch later" | "saved";