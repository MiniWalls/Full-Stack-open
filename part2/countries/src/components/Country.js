import {useState} from 'react'

const Country = (props) => {
    const {selectedCountry} = props
    const [showCountry, setShowCountry] = useState(false)

    if(showCountry === false){
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
        <img src={selectedCountry.flags.png}></img> 
      </div>
    )
}

export default Country