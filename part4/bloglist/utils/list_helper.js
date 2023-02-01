const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      favorite = blog
    }
    return favorite
  })
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = (blogs) => {
    const map = new Map()
    for (const blog of blogs) {
      const count = map.get(blog.author) || 0
      map.set(blog.author, count + 1)
    }
    const obj = Object.fromEntries(map)
    const key = Object.keys(Object.fromEntries(map)).reduce(function(a, b) { return obj[a] > obj[b] ? a : b})
    return { author: key, blogs: obj[key] }
  }

  return blogsByAuthor(blogs)
}

const mostLikes = (blogs) => {
  const likesByAuthor = (blogs) => {
    const map = new Map()
    for (const blog of blogs) {
      const count = map.get(blog.author) || 0
      map.set(blog.author, count + blog.likes)
    }
    const obj = Object.fromEntries(map)
    const key = Object.keys(Object.fromEntries(map)).reduce(function(a, b) { return obj[a] > obj[b] ? a : b})
    return { author: key, likes: obj[key] }
  }

  return likesByAuthor(blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}