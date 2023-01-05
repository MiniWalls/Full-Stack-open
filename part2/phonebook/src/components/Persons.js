import Number from './Number'

const Persons = ({filter, persons}) => {
    return(
        <div>
            {persons.map(person => { 
                return person.name.toLowerCase().includes(filter.toLowerCase()) ? <Number key={person.name} person={person} /> : null }
            )}
        </div>
    )
}

export default Persons