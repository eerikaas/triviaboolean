import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';

function App() {
const [insert, setInsert] = useState([])
const [correct, setCorrect] = useState()
const [points, setPoints] = useState(0)

useEffect(() => {
  next()
}, [])

const next = () => {
  fetch('https://opentdb.com/api.php?amount=1&type=boolean')
  .then(response => response.json())

  .then(resData => {
    setCorrect(null)
    setInsert(resData.results[0])
  })
  .catch(err => console.log(err))
}

const handleClick = (e, value) => {
  e.preventDefault();
  if (e.target.value === insert.correct_answer) {
    pointCount()
    next()
  } else {
    next()
  }
}

const pointCount = () => {
  setPoints(points + 1)
}

return (
  <div>
    <p className='Game'>{insert.question}</p>
      <button onClick={handleClick} value="True" className='Button'>True</button>
      <button onClick={handleClick} value="False" className='Button'>False</button>
      <button onClick={next} className='Button'>Skip question</button>
      {points > 0 ? <p>Your points: {points}</p> : null}
  </div>
)
}

export default App;