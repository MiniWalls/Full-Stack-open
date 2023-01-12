import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        .then((response) => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === personObject.name)
        personService
          .update(person.id, personObject)
          .then((response) => {
            setPersons(persons.map(person => person.id !== response.id ? person : response))
            setSuccessMessage(`Updated ${personObject.name}`)
            setTimeout(() => {          
              setSuccessMessage(null)        
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response))
          setSuccessMessage(`Added ${personObject.name}`)
          setTimeout(() => {          
            setSuccessMessage(null)        
          }, 5000)
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
      <Notification type="success" message={successMessage} />
      <Notification type="error" message={errorMessage} />
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