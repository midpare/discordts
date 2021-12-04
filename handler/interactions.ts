import { glob } from 'glob'
import { promisify } from 'util'

const globPromise = promisify(glob)

export = async function (client: any) {
  const interactionFiles = await globPromise(`${__dirname}/../interactions/**/*{.ts,.js}`)
  interactionFiles.forEach((value) => {
    const file = require(value)
    client.interactions.set(file.name, file)
  })
}