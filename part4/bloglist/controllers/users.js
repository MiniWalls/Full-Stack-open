const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const passwordHash = password //Password gets hashed in the model with .save() function

  console.log(passwordHash)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  if(password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter