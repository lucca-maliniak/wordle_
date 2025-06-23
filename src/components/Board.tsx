import { useEffect, useRef, useState } from 'react'
import Lines from "./Lines"
import '../styles/Board.css'
import { initialGuess, type Guesses } from '../model/Wordle'
import { COLORS, MAX_WORD_LENGTH } from '../shared/Constants'
import GameFinish from './GameFinish'

const API_URL = 'https://random-words-api.kushcreates.com/api?language=en&length=5&words=1'

export default function Board() {
  const [solution, setSolution] = useState<string>('')
  const [guesses, setGuesses] = useState<Guesses[]>(initialGuess)
  const [gameIsFinish, setGameIsFinish] = useState<boolean>(false)
  const currentGuessIdRef = useRef(0)

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => handleInput(event.key)
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [solution, guesses])
  
  useEffect(() => {
    const getWords = async () => {
      const response = await fetch(API_URL)
      const wordsAPI = await response.json()
      setSolution(wordsAPI[0].word.toUpperCase())
    }
    getWords()
  }, [])

  const handleEnter = () => {
    validateGuess()
    goToNextLine()
  }

  const goToNextLine = () => {
    setTimeout(() => {
      currentGuessIdRef.current++
    });
  }

  const validateGuess = () => {
    const wordGuessedArray = guesses[currentGuessIdRef.current].currentWord.split('')
    const solutionArray = solution.split('')

    const colors = Array(MAX_WORD_LENGTH).fill(COLORS.GRAY)
    const lettersUsed = Array(MAX_WORD_LENGTH).fill(false)

    checkForGreenTiles(wordGuessedArray, solutionArray, colors, lettersUsed);
    checkForYellowTiles(wordGuessedArray, solutionArray, colors, lettersUsed);

    setGuesses(prevGuesses =>
      prevGuesses.map((guess, index) =>
        index === currentGuessIdRef.current
          ? { ...guess, color: colors }
          : guess
        )
      )

    setTimeout(() => {
      identifyIfGameFinish(colors, lettersUsed);
    }, 500)
  }

  const identifyIfGameFinish = (colors: string[], lettersUsed: boolean[]) => {
    const isVictory = colors.every(color => color === COLORS.GREEN) && lettersUsed.every(Boolean);
    if (isVictory) {
      setGameIsFinish(true)
    }
  }

  const checkForGreenTiles = (wordGuessedArray: string[], solutionArray: string[], colors: string[], lettersUsed: boolean[]) => {
    for (let i = 0; i < MAX_WORD_LENGTH; i++) {
      if (wordGuessedArray[i] === solutionArray[i]) {
        colors[i] = COLORS.GREEN
        lettersUsed[i] = true
      }
    }
  }

  const checkForYellowTiles = (wordGuessedArray: string[], solutionArray: string[], colors: string[], lettersUsed: boolean[]) => {
    for (let i = 0; i < MAX_WORD_LENGTH; i++) {
      if (colors[i] === COLORS.GREEN) continue
      for (let j = 0; j < MAX_WORD_LENGTH; j++) {
        if (!lettersUsed[j] && wordGuessedArray[i] === solutionArray[j]) {
          colors[i] = COLORS.YELLOW
          lettersUsed[j] = true
          break
        }
      }
    }
  }

  const fillInput = (letter: string) => {
    setGuesses(prevGuesses => prevGuesses.map((guess, index) => {
      if (index === currentGuessIdRef.current && guess.currentWord.length < MAX_WORD_LENGTH) {
        return {
          ...guess, 
          currentWord: guess.currentWord + letter.toUpperCase(),
        }
      } else {
        return guess
      }
    }))
  }

  const handleInput = (key: string) => {
    if (!solution) return
    if (key === 'Enter') { 
      handleEnter()
    } else if (/^[a-zA-Z]$/i.test(key)) {
      fillInput(key)
    } else if (key === 'Backspace') {
      deleteLetter();
    }
  }

  const deleteLetter = () => {
    setGuesses(prevGuesses => prevGuesses.map((guess, index) => {
      if (index === currentGuessIdRef.current) {
        return {
          ...guess, 
          currentWord: guess.currentWord.slice(0, -1),
        }
      } else {
        return guess
      }
    }))
  }

  return (
    <div className="canvas">
      <GameFinish finish={gameIsFinish} />
      <div className="board">
        <Lines guesses={guesses}/>
      </div>
    </div>
  )
}