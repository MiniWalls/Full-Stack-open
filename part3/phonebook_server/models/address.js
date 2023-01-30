const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.DB_URL

console.log(`connecting to ${url}`)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}?[-]?\d{5,}/.test(v)
      }
    }
  },
})

addressSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

addressSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true
  this.options.new = true
  next()
})

module.exports = mongoose.model('Address', addressSchema)