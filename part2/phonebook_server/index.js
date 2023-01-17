const express = require('express')
const app = express()

app.use(express.json())

let addresses = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(addresses)  
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const address = addresses.find(address => address.id === id)
  if(address){
    response.json(address)
  } else {
    response.status(404).end()
  }
  console.log(address)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  addresses = addresses.filter(address => address.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 5000000)
  const person = request.body
  console.log(request.body)
  person.id = id
  addresses = addresses.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`<p>Phone book has info for ${addresses.length} people </br> ${date} </p>`)  
})


const PORT = 3001
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})