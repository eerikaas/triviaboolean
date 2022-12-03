import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Life from "./lives/Life.js";
import NoLife from "./lives/NoLife.js";

window.addEventListener("animationend", (event) => {
  event.target.className = "Button"
})

function App() {
  const [insert, setInsert] = useState([])
  const [points, setPoints] = useState(0)
  const [life, setLife] = useState(5)

  const next = useCallback(() => {
    fetch("https://opentdb.com/api.php?amount=1&type=boolean")
      .then((response) => response.json())
      .then((resData) => {
        setInsert(resData.results[0])
      })
      .catch((err) => console.log(err))
  }, [setInsert])

  useEffect(() => {
    next()
  }, [next, points, life])

  const handleClick = (e, value) => {
    if (e.target.value === insert.correct_answer) {
      pointCount()
      e.target.className = "Button Button-correct"
    } else {
      setLife(life - 1)
      e.target.className = "Button Button-incorrect"
    }
  }

  const pointCount = () => {
    setPoints(points + 1)
  }

  const newGame = () => {
    setPoints(0)
    setLife(5)
    next()
  }

const decode = (str) => {
  let txt = document.createElement('textarea')
  txt.innerHTML = str
  console.log(txt.value)
  return txt.value
}

const skipper = (e) => {
  e.target.className = "Button Button-skip"
  next()
}

const LifeIcons = ({ count, lost }) => (
  <>
    {Array.from({ length: count }).map(() => (
      <Life />
    ))}
    {Array.from({ length: lost }).map(() => (
      <NoLife />
    ))}
  </>
)


  if (life > 0) {
    return (
      <div style={{backgroundImage: "url('https://img.freepik.com/free-vector/cute-rainbow-frame-vector-beige-background-cute-hand-drawn-style_53876-126112.jpg?w=2000')", height:"100vh"}}>
        <p style={{fontSize: "40px"}} className="Game">{decode(insert.question)}</p>
        <button onClick={handleClick} value="True" className="Button">True</button>
        <button onClick={handleClick} value="False" className="Button">False</button>
        <button onClick={skipper} className="Button">Skip question</button>
        <LifeIcons count={life} lost={5 - life} />
        <h2 style={{textAlign: "center"}}>{points > 0 ? <p>Your points: {points}</p> : null}</h2>
      </div>
    )
  } else {
    return (
      <div style={{backgroundImage: "url('https://wallpaperaccess.com/full/1305831.jpg')", height:"100vh", textAlign: "center" }}>
        <h1>GAME OVER!</h1>
        <p>Your score: {points}</p>
        <button className="Button" onClick={newGame}>Play again :-)</button>
      </div>
    )
  }
}

export default App;
