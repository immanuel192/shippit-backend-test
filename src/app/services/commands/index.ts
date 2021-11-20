import { Family } from '../../models'
import { CommandType, RawCommand } from '../../types'
import { commandAddChild } from './add-child'
import { commandGetRelationship } from './get-relationship'

export const getAvailableCommands = (family: Family) => {
  return {
    [CommandType.ADD_CHILD]: (rawCommand: RawCommand) => commandAddChild(family, rawCommand),
    [CommandType.GET_RELATIONSHIP]: (rawCommand: RawCommand) => commandGetRelationship(family, rawCommand),
  }
}
