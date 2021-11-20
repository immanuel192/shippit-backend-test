import * as bluebird from 'bluebird'
import { RawCommand } from './types'
import { LengaburuFamily } from './models/lengaburu-family'
import { buildFamilyTree } from './models/utils'
import { getAvailableCommands } from './services/commands'

export const main = async (rawCommands: RawCommand[]) => {
  //
  const { dictionary, root } = await buildFamilyTree()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const family = new LengaburuFamily(root, dictionary)

  //
  const commands = await getAvailableCommands(family)
  const result = await bluebird.mapSeries(rawCommands, async (rawCommand) => {
    if (commands[rawCommand.command]) {
      return commands[rawCommand.command](rawCommand)
    }
    throw new Error(`Unknown ${rawCommand.command}`)
  })
  //
  return result
}
