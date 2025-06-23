export interface Guesses {
  id: number;
  currentWord: string;
  color: string[];
}

export const initialGuess: Guesses[] = [
  { id: 0, currentWord: '', color: [] },
  { id: 1, currentWord: '', color: [] },
  { id: 2, currentWord: '', color: [] },
  { id: 3, currentWord: '', color: [] },
  { id: 4, currentWord: '', color: [] },
  { id: 5, currentWord: '', color: [] },
]