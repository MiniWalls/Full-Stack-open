const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  for(let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    const response = await api.get('/api/users')
    expect(response.type).toBe('application/json')
  })

  test('all the users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})

describe('addition of a new user', () => {
  test('valid user can be addded', async () => {
    const user = {
      'username': 'validuser',
      'name': 'Valid Testuser',
      'password': 'qwerty12345'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
    expect(usersAtEnd[usersAtEnd.length - 1].username).toBe(user.username) //Checks that last user in the array is the one we added
  })

  test('user without username or password is not added and returns 400', async () => {
    const usersAtStart = await helper.usersInDb()
    let user = {
      'username': '',
      'name': 'Invalid Testuser',
      'password': 'qwerty12345'
    }

    await api.post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    user.username = 'invaliduser2'
    user.password = ''

    await api.post('/api/users')
      .send(user)
      .expect(400)

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})