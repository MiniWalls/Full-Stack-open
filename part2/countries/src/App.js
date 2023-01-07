import axios from 'axios'
import {useState, useEffect} from 'react'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState()

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    if(countries.filter(element => element.name.common.toLowerCase().includes(filter.toLowerCase())).length === 1){
      setSelectedCountry(countries.find(element => element.name.common.toLowerCase().includes(filter.toLowerCase())))
      console.log("Found country")
    }
  }, [filter])

  useEffect(() => {
    console.log(selectedCountry)
  }, [selectedCountry])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
      setCountries(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  if(countries.filter(element => element.name.common.toLowerCase().includes(filter.toLowerCase())).length > 10){
    return(
      <div>
        Find country: <input onChange={handleFilterChange}/>
        <br/> Too many matches, specify another filter
      </div>
    )
  }
  if(countries.filter(element => element.name.common.toLowerCase().includes(filter.toLowerCase())).length === 1 && selectedCountry != null){
    return(
      <div>
        Find country: <input onChange={handleFilterChange}/>
        <h1>{selectedCountry.name.common}</h1>
        {selectedCountry.capital} <br />
        area {selectedCountry.area}
        <h3>languages:</h3>
        {Object.values(selectedCountry.languages).map(item => {
          return(<div key={item}>{item}</div>)
        })}
        <img src={selectedCountry.flags.png}></img> 
      </div>
    )
  }
  return(
    <div>
      Find country: <input onChange={handleFilterChange}/>
      {countries.map(element => {
        return element.name.common.toLowerCase().includes(filter.toLowerCase()) ? <Country selectedCountry={element} key={element.name.common} /> : null 
      })}
    </div>
  )
}

export default App;
