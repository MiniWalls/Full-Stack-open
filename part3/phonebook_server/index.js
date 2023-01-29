require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const Address = require('./models/address');
const address = require("./models/address");
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

app.get('/api/persons/:id', (request, response, next) => {
  Address.findById(request.params.id)
    .then(address => {
      if (address) {
        response.json(address)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const address = {
    name: body.name,
    number: body.number,
  }

  Address.findByIdAndUpdate(request.params.id, address)
    .then(updatedAddress => {
      response.json(updatedAddress)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Address.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date();
  Address.find({}).then(addresses => {
    response.send(`<p>Phone book has info for ${addresses.length} people </br> ${date} </p>`)  
  })  

})

morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)});
app.use(morgan(':method :url :status :res[content-length] :response-time ms :response-body')) //include newly defined ':response-body' token

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const address = new Address ({
    name: body.name,
    number: body.number,
  })

  address.save()
  .then(savedAddress => {
    response.json(savedAddress)
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})