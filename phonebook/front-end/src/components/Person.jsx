const Person = ({name, number, onClick}) => {
  return(
    <div>
      {name} {number} <button onClick={onClick}>delete</button>
    </div>
  )
}

export default Person