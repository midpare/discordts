import { glob } from 'glob'
import { promisify } from 'util'

const globPromise = promisify(glob)

export = async function (client: any) {
  const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`)
  eventFiles.forEach((value) => {
    const file = require(value)
    client.on(file.name, file.event)
  })
}