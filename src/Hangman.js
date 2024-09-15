import React, { useState } from "react";
import {randomWord} from "./Words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

function Hangman(){
  const images = [img0, img1, img2, img3, img4, img5, img6];
  const [image, setImage] = useState(img0);
  const [guess,setGuess] = useState(new Set());
  const [wrong,setWrong] = useState(0);
  const [answer] = useState(randomWord);
  const maxWrong = 7;

  function guessed() {
    return answer.split("").map(ltr => (guess.has(ltr) ? ltr : "_")).join(" ");
  }
  function generateLetters() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button key={ltr} value={ltr} onClick={handleGuess} disabled={guess.has(ltr)|| gameOver() || gameWon()}>
        {ltr}
      </button>
    ));
  }
  function handleGuess(evt) {
    let ltr = evt.target.value;

    // Update the guessed letters set
    setGuess(st => new Set(st).add(ltr));

    if (!answer.includes(ltr)) {
      setWrong(st => {
        const newWrong = st + 1;
        if(newWrong === 7) setImage(images[6]);
        else setImage(images[newWrong]); // Update image based on wrong guesses
        return newWrong;
      });
    }
  }
   // Check if game is over (lost)
   function gameOver() {
    return wrong >= maxWrong;
  }

  // Check if game is won
  function gameWon() {
    return answer.split("").every(ltr => guess.has(ltr));
  }
  return (
    <>
    <div className="Hangman">
      <h1>Hangman</h1>
      <img src={image} alt="Hangman"></img>
      <div className="correct-guess">{guessed()}</div>
      {gameOver() ? (
          <p className="msg-display">You Lose! The word was: {answer}</p>
        ) : gameWon() ? (
          <p className="msg-display">Congratulations! You won!</p>
        ) : (
          <div className="Hangman-btns">{generateLetters()}</div>
        )}
        <p className="msg-display">Wrong guesses: {wrong}</p>
    </div>
    </>
  )
}


export default Hangman;
