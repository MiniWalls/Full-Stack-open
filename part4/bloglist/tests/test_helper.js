const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const initialUsers = [
  {
    'username': 'root',
    'name': 'Superuser',
    'passwordHash': 'sekret'
  },
  {
    'username': 'Tapsa',
    'name': 'Tapani Tavoittelija',
    'passwordHash': 'qwerty'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const user = await User.find({})
  return user.map(u => u.toJSON())
}

const userToken = async () => {
  const userCredentials = {
    username: initialUsers[0].username,
    password: initialUsers[0].passwordHash
  }

  const user = await User.findOne({ username: userCredentials.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(userCredentials.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return { 'token': 'invalid username or password' }
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 600 * 600 }
  )
  return({ token, username: user.username, name: user.name })
}

module.exports = {
  initialBlogs, blogsInDb,
  initialUsers, usersInDb,
  userToken
}