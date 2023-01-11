import Number from './Number'

const Persons = ({filter, persons, onClick}) => {
    return(
        <div>
            {persons.map(person => { 
                return person.name.toLowerCase().includes(filter.toLowerCase()) ? <Number key={person.id} person={person} onClick={onClick}/>  : null }
            )}
        </div>
    )
}

export default Persons