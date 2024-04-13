import { useEffect, useState } from "react"
import Person from "./components/Person"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from './services/persons'
import Notification from "./components/Notification"
import ErrorMessage from './components/ErrorMessage'
import './index.css'

const App = () => {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(personData => {
        setPerson(personData)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

  const nameExists = person.find( p => p.name === newName)
  
  if (nameExists) {
    if(window.confirm(`${newName} is already in the phonebook, do you want to update the old number?`)) {
      const updatedPerson = { ...nameExists, number: newNumber };

      personService
        .update(nameExists.id, updatedPerson)
        .then(updatedData => {
          setPerson(person.map(p => p.id === updatedData.id ? updatedData : p));
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${updatedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000);
        })
        .catch( err => {
          setErrorMessage(`${updatedPerson.name} has already been deleted!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
        
    }
  } else {
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then( newData => {
        setPerson([...person.concat(newData)])
        setNewName('')
        setNewNumber('')
      })
      .catch( err => {
        console.log('Already deleted!')
      })

      setMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 2000);
  
  }
  setNewName('')
  setNewNumber('')

  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilteredName(e.target.value)
  }

  const handleDelete = (id) => {
    const deletedPerson = person.find( p => p.id === id)

    if(window.confirm(`Do you really want to delete ${deletedPerson.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPerson(person.filter( p => p.id !== id))
        })
    }
    return null
  }

  const filteredPersons = person.filter(p => p.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMessage error={errorMessage} />
      <Filter value={filteredName} onChange={handleFilter} />
      <h2>Add New</h2>
      <PersonForm onSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      {filteredPersons.map(p => <Person key={p.id} name={p.name} number={p.number} onClick={() => handleDelete(p.id)} />)}
    </div>
  )
}

export default App
