const Header = ({name}) => {
    return(
      <h1>{name}</h1>
    )
  }
  
const Content = (props) => {
return(
    <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
    </div>
)
}

const Part = (props) => {
return(
    <p>{props.part.name} {props.part.exercises}</p>
)
}

const Total = (props) => {
    return(
        <p>Number of exercises {props.parts.reduce((acc, part) => { return acc + part.exercises;}, 0)} </p>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}></Header>
            {course.parts.map(part => 
                <Part key={part.id} part={part}/>
                )}
            <Total parts={course.parts}></Total>
        </>
    )
}

export default Course