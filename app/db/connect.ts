import mongoose from 'mongoose'

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/mongoose_remix_todos'

console.log('Connecting to ', process.env.MONGOOSE_URI ?? DEFAULT_URI)

await mongoose.connect(process.env.MONGOOSE_URI ?? DEFAULT_URI)
