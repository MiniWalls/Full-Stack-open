const express = require('express')
const morgan = require('morgan')
const app = express()

function isPostRequest(req) {
  return req.method === 'POST'
}

app.use(express.json())
app.use(morgan('tiny', {
  skip: isPostRequest
}))

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

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`<p>Phone book has info for ${addresses.length} people </br> ${date} </p>`)  
})

morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)});
app.use(morgan(':method :url :status :res[content-length] :response-time ms :response-body')) //include newly defined ':response-body' token

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 5000000)
  const person = request.body
  console.log(request.body)
  person.id = id
  console.log(person.name, person.number)
  if(!person.name || !person.number){
    return response.status(400).json({error: 'name or number is missing'}).end()
  } else if (addresses.some(element => element.name === person.name)){
    return response.status(400).json({error: 'name must be unique'}).end()
  } else {
    addresses = addresses.concat(person)
    response.json(person)
  }
})




const PORT = 3001
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})