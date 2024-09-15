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
  const answer = randomWord();

  function guessed() {
    return answer.split("").map(ltr => (guess.has(ltr) ? ltr : "_")).join(" ");
  }
  function generateLetters() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button key={ltr} value={ltr} onClick={handleGuess} disabled={guess.has(ltr)}>
        {ltr}
      </button>
    ));
  }
  function handleGuess(evt) {
    let ltr = evt.target.value;

    // Update the guessed letters set
    setGuess(st => new Set(st).add(ltr));

    // Update wrong guesses and the hangman image
    setWrong(st => st + (answer.includes(ltr) ? 0 : 1));

    // Update the image based on the number of wrong guesses
    setImage(images[wrong + (answer.includes(ltr) ? 0 : 1)]);
  }
  return (
    <>
    <div className="main">
      <h1>Hangman</h1>
      <img src={image} alt="Hangman"></img>
      <div className="correct-guess">{guessed()}</div>
      <div className="btns">{generateLetters()}</div>
    </div>
    </>
  )
}


export default Hangman;
