import axios from 'axios'
import {useState, useEffect} from 'react'

const Country = (props) => {
    const {selectedCountry} = props
    const [showCountry, setShowCountry] = useState(false)
    const [weather, setWeather] = useState(null)
    
    useEffect(() => {
        if(showCountry === true){
            const address = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`
            axios.get(address)
            .then((response) => {
                console.log(response.data)
                setWeather(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [showCountry, selectedCountry.capital])

    useEffect(() => {
        setShowCountry(props.showCountry);
    }, [])

    if(showCountry === false || weather === null){
        return( 
            <div>
                {selectedCountry.name.common}
                <button onClick={() => setShowCountry(!showCountry)}>Show</button>
            </div>
        )
    }
    return(
      <div>
        <h1>{selectedCountry.name.common}</h1>
        {selectedCountry.capital} <br />
        area {selectedCountry.area}
        <h3>languages:</h3>
        {Object.values(selectedCountry.languages).map(item => {
          return(<div key={item}>{item}</div>)
        })}
        <img alt="flag" src={selectedCountry.flags.png}></img> 
        <h1>Weather in {selectedCountry.capital[0]}</h1>

        <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
}

export default Country