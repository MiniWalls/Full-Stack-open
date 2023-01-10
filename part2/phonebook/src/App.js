import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    /* persons.some(element => element.name === personObject.name) ? alert(`${personObject.name} already exists`) : setPersons(persons.concat(personObject))
 */
    if(persons.some(element => element.name === personObject.name)){
      alert(`${personObject.name} already exists`)
    } else {
      personService
        .create(personObject)
        .then((response) => {
          console.log(response.data)
          setPersons(persons.concat(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
        <PersonForm newNumber={newNumber} handleNumberChange={handleNumberChange}
          newName={newName} handleNameChange={handleNameChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
        <Persons filter={filter}persons={persons} />
    </div>
  )
}

export default App