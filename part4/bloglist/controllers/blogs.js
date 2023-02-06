const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
  })

  if(blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  console.log(`blog: ${blog} user: ${user} and one user blog is ${user.blogs[0]} while blog id is ${blog._id}`)
  if(user.blogs.includes(blog._id)) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(b => b.toString() !== request.params.id.toString())
    await user.save()

    response.status(204).end()
  } else {
    console.log('It did not contain the id')
    return response.status(401).json({ error: 'unauthorized' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(blog)
})

module.exports = blogsRouter