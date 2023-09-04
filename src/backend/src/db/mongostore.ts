import mongoose, { ConnectOptions } from 'mongoose'

const MONGO_URI = process.env.CLAMP_DB_URI || 'mongodb://localhost:27017/clamp_db'

console.log('Attempting to create connection in', process.env.NODE_ENV)

// Create a Mongoose connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

// Handle MongoDB connection events
const db = mongoose.connection

db.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

db.on('connected', () => {
  console.log('Connected to MongoDB')
})

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

process.on('SIGINT', async () => {
  await db.close()
  console.log('MongoDB connection closed')
  process.exit(0)
})

export default connectToMongoDB
