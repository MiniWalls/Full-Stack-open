const Header = ({name}) => {
    return(
      <h1>{name}</h1>
    )
}

const Part = (props) => {
    return(
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = (props) => {
    return(
        <h3>Number of exercises {props.parts.reduce((acc, part) => { return acc + part.exercises;}, 0)} </h3>
    )
}

const Course = ({course}) => {
    console.log(course)
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