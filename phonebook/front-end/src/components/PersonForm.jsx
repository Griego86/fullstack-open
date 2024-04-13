const PersonForm = ({onSubmit, newName, handleNewName, newNumber, handleNewNumber }) => {
  return(
    <form onSubmit={onSubmit} >
    <div>
      <div>
        name: <input value={newName} onChange={handleNewName}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm