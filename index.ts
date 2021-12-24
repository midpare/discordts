import { client } from './contexts/client'
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URI || '')
client.start()