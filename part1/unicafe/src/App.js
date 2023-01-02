import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  if(good === 0 && neutral === 0 && bad === 0){
    return ( 
      <p>No feedback given</p> 
    )
  }
  return(
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {(1*good + 0*neutral + (-1)*bad)/(good + neutral + bad)}</p>
      <p>positive {(good/(neutral + bad + good))*100}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)} >good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App