import { Schema, model } from 'mongoose'

const warningInfo = new Schema({
  id: String,
  name: String,
  warning: Number
})

const warning = model('warning', warningInfo)
export { warning }


