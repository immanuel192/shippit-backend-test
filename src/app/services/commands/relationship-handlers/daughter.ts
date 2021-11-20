import { Gender } from '../../../data'
import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const daughter: RelationshipHandler = async (person) => {
  return person.children.filter(child => child.gender === Gender.Female)
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.Daughter] = daughter
}
