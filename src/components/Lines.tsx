import type { Guesses } from '../model/Wordle';
import '../styles/Line.css'
import Tiles from './Tiles';

interface ILines {
  guesses: Guesses[];
}

export default function Lines({ guesses }: ILines) {
  const renderLine = () => {
    const lines = [];
    for (let i = 0; i < 6; i++) {
      lines.push(<div key={i} className="line"><Tiles currentWord={guesses[i].currentWord} color={guesses[i].color}/></div>);
    }
    return lines;
  }

  return renderLine()
}