import '../styles/GameFinish.css'

interface GameFinishProps {
  finish: boolean;
}

export default function GameFinish({ finish }: GameFinishProps) {
  return finish && (
    <div className="finish">
      <div className="informations">
        <div className="title">CONGRATULATIONS!</div>
        <div className="subtitle">You win the game!</div>
      </div>
      <div className="image-area">
        <img src="https://media.giphy.com/media/v1.Y2lkPTgyYTE0OTNicGRxYzllbDUzdTYwd3RhYzJncndvNGQ3bHhzZXR5aGp4ZWo2dDhxaSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/KPgOYtIRnFOOk/giphy.gif" />
      </div>
      <div className="area-restartGame">
        <button className="restartGame"><a href='/'>Restart Game</a></button>
      </div>
    </div>
  )
  
}