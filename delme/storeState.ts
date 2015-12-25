// Type for the overall application state held in our Store

export interface StoreState {
  name:     string;
  hostName: string;
  movieA:   string;
  movieB:   string;
  queue:    string[];
}
