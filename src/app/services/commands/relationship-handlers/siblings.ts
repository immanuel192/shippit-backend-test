import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const siblings: RelationshipHandler = async (person) => {
  if (!person.mother) {
    return []
  }
  return person.mother.children.filter(child => child.id !== person.id)
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.Siblings] = siblings
}
