import '../styles/Tile.css'

interface ITiles {
  currentWord: string;
  color?: string[];
}

export default function Tiles({ currentWord, color }: ITiles) {
  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < 5; i++) {
      tiles.push(<span key={i} className="tile" style={{ backgroundColor: color?.[i] }}>{currentWord[i] ?? ''}</span>);
    }
    return tiles;
  }

  return renderTiles()
}