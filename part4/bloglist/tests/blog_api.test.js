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
describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
  test('blog can be added', async() => {
    const credentials = await helper.userToken()
    const token = credentials.token

    const newBlog = {
      title: 'Fishermans Diaries',
      author: 'Arto kalastaja',
      likes: 2,
      url: 'http://www.kalastaja.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(newBlog.title)
  })

  test('blog without likes defaults to 0', async() => {
    const credentials = await helper.userToken()
    const token = credentials.token

    const newBlog = {
      title: 'Fishermans Diaries 2',
      author: 'Arto kalastaja',
      url: 'http://www.kalastaja2onparempi.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('blog without title or url returns 400', async() => {
    const credentials = await helper.userToken()
    const token = credentials.token

    const newBlog = {
      author: 'Arto kalastaja',
      url: 'http://www.kalastaja2onparempi.fi',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const newBlog2 = {
      author: 'Arto kalastaja',
      title: 'Fishing diaries 2',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
  test('trying to add a blog without authorization returns 401', async() => {
    const newBlog = {
      title: 'Fishermans Diaries',
      author: 'Arto kalastaja',
      likes: 2,
      url: 'http://www.kalastaja.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

/* describe('deletion of a blog', () => {
  test('blog can be deleted', async() => {
    const credentials = await helper.userToken()
    const token = credentials.token
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1)
  })
   test('blog without valid id returns 400', async() => {
    await api
      .delete('/api/blogs/123')
      .expect(400)
  }) 
})

describe('change of existing blog', () => {
  test('blog likes can be updated', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes +1)
  })
  test('blog without valid id returns 400', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id+'123'}`)
      .send(updatedBlog)
      .expect(400)
  })
} */

afterAll(async () => {
  await mongoose.connection.close()
})