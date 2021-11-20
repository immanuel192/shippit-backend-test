import { Gender } from '../../../data'
import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const son: RelationshipHandler = async (person) => {
  return person.children.filter(child => child.gender === Gender.Male)
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.Son] = son
}
