import { useState, useEffect } from 'react'
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

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      personService
        .deletePerson(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(element => element.name === personObject.name)){
      alert(`${personObject.name} already exists`)
    } else {
      personService
        .create(personObject)
        .then((response) => {
          console.log(response)
          setPersons(persons.concat(response))
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      console.log(response)
      setPersons(response)
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
        <Persons filter={filter}persons={persons} onClick={deletePerson}/>
    </div>
  )
}

export default App