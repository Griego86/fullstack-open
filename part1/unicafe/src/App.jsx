import { useState } from "react"


const Button = ({onClick, text}) => {
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Statistics = ({counter, text}) => {
  return(
    <div>
      {text} {counter}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const text = ['good', 'neutral', 'bad']

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text={text[0]} />
        <Button onClick={handleNeutralClick} text={text[1]} />
        <Button onClick={handleBadClick} text={text[2]}/>
      <h1>statistics</h1>
        <Statistics counter={good} text={text[0]} />
        <Statistics counter={neutral} text={text[1]} />
        <Statistics counter={bad} text={text[2]} />
    </div>
  )
  }

export default App
