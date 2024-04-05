const Header = ({name}) => {
  return(
  <div>
    <h2>{name}</h2>
    </div>
  )
}

const Total = ({total}) => {
  return(
    <div>
      <strong>Number of exercises {total}</strong>
    </div>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = ({part}) => {
  const {name, exercises} = part

  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Course = ({course}) => {
  const totalExercises = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)

  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  )
}


export default Course