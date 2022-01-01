import { glob } from 'glob'
import { promisify } from 'util'
import { ExtendClient } from '../structures/client'
import { InteractionType } from '../typings/interaction'

const globPromise = promisify(glob)

export = async function (client: ExtendClient) {
  const interactionFiles = await globPromise(`${__dirname}/../interactions/**/*{.ts,.js}`)
  interactionFiles.forEach((value: string) => {
    const file: InteractionType = require(value)
    client.interactions.set(file.name, file)
  })
}