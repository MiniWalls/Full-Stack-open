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
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(1*good + 0*neutral + (-1)*bad)/(good + neutral + bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(good/(neutral + bad + good)) * 100 + '%'}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => {
  const {onClick, text} = props;
  return(
    <button onClick={onClick}>{text}</button>
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
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button onClick={() => setBad(bad + 1)} text={"bad"}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App