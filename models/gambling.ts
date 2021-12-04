import { Schema, model } from 'mongoose'

const gamblingInfo = new Schema({
  id: String,
  name: String,
  date: Number,
  money: Number,
  debt: Number,
  gamLevel: Number,
  baseMoneyCoolTime: Number,
  stock: [{name: String, count: Number, money: Number}, {_id: false}]
})

const gambling = model('gambling', gamblingInfo)
export { gambling }
