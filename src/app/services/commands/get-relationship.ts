import { Family, GetRelationshipResult } from '../../models'
import { PersonRelationshipType, RawCommand } from '../../types'
import { RelationshipManager } from './relationship-handlers/types'
import { registerAllRelationships } from './relationship-handlers'

export const relationShipHandlers: RelationshipManager = {}

registerAllRelationships(relationShipHandlers)

export const commandGetRelationship = async (family: Family, rawCommand: RawCommand): Promise<string> => {
  if (rawCommand.params.length !== 2) {
    throw new Error(`${rawCommand.command} command requires exactly 2 parameters`)
  }

  if (!Object.values(PersonRelationshipType).includes(rawCommand.params[1] as PersonRelationshipType)) {
    return GetRelationshipResult.NONE
  }

  const person = await family.find(rawCommand.params[0])
  if (!person) {
    return GetRelationshipResult.PERSON_NOT_FOUND
  }

  const result = await relationShipHandlers[rawCommand.params[1]](person)

  if (result.length === 0) {
    return GetRelationshipResult.NONE
  }
  return result.map(p => p.name).join(' ')
}
