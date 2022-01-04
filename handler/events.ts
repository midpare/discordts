import { glob } from 'glob'
import { promisify } from 'util'
import { ExtendClient } from '../contexts/client'

const globPromise = promisify(glob)

export = async function (client: ExtendClient) {
  const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`)
  eventFiles.forEach((value: string) => {
    const file = require(value)
    try {
      client.on(file.name, file.event)
    } catch(error) {
      console.error(error)
    }
  })
}