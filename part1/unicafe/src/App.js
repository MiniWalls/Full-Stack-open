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
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="average" value={(1*good + 0*neutral + (-1)*bad)/(good + neutral + bad)} />
      <StatisticLine text="positive" value={(good/(neutral + bad + good)) * 100 + '%'} />
    </>
  )
}

const Button = (props) => {
  const {onClick, text} = props;
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props;
  return(
    <p>{text} {value}</p>
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
      <Button onClick={() => setGood(good + 1)} text={"good"}/>
      <Button onClick={() => setBad(neutral + 1)} text={"neutral"}/>
      <Button onClick={() => setNeutral(bad + 1)} text={"bad"}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App