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
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
)}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}></Header>
            {course.parts.map(part => 
                <Part key={part.id} part={part}/>
                )}
        </>
    )
}

export default Course