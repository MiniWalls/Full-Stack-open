require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const Address = require('./models/address')
const app = express()

function isPostRequest(req) {
  return req.method === 'POST'
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny', {
  skip: isPostRequest
}))

app.get('/api/persons', (request, response) => {
  Address.find({}).then(addresses => {
    response.json(addresses)
  })  
})

app.get('/api/persons/:id', (request, response) => {
  Address.findById(request.params.id).then(address => {
    response.json(address)
  })
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
  const person = request.body

  if(!person.name || !person.number) {
    return response.status(400).json({error: 'name or number is missing'}).end()
  } else {
    const address = new Address({
      name: person.name,
      number: person.number
    })

    address.save().then(savedAddress => {
      response.json(savedAddress)
    })
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})