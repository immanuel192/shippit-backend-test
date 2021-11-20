import { Gender } from '../../data'
import { Family } from '../../models'
import { RawCommand } from '../../types'

export const commandAddChild = async (family: Family, rawCommand: RawCommand): Promise<string> => {
  if (rawCommand.params.length !== 3) {
    return Promise.reject(new Error(`${rawCommand.command} command requires exactly 3 parameters`))
  }

  const result = await family.addChild(rawCommand.params[0], rawCommand.params[1], rawCommand.params[2] as Gender)
  return result.toString()
}
