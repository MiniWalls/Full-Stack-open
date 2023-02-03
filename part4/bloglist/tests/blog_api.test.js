const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.type).toBe('application/json')
})

test('all the blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog can be added', async() => {
  const newBlog = {
    title: 'Fishermans Diaries',
    author: 'Arto kalastaja',
    likes: 2,
    url: 'http://www.kalastaja.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(newBlog.title)
})

test('blog without likes defaults to 0', async() => {
  const newBlog = {
    title: 'Fishermans Diaries 2',
    author: 'Arto kalastaja',
    url: 'http://www.kalastaja2onparempi.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('blog without title or url returns 400', async() => {
  const newBlog = {
    author: 'Arto kalastaja',
    url: 'http://www.kalastaja2onparempi.fi',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const newBlog2 = {
    author: 'Arto kalastaja',
    title: 'Fishing diaries 2',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})