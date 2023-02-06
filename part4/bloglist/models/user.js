const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

// Delete the passwordHash and the _id and __v properties when returning a user
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  const user = this
  if(user.isModified('passwordHash')) {
    const saltRounds = 10
    user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User