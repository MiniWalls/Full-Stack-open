const Number = ({person, onClick}) => {
    return(
        <p>{person.name} {person.number} &nbsp;
        <button onClick={() => onClick(person.id)}>delete</button></p>
    )
}

export default Number