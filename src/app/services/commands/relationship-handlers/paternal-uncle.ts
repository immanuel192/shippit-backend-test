import { Gender } from '../../../data'
import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const paternalUncle: RelationshipHandler = async (person) => {
  if (!(person.father && person.father.mother)) {
    return []
  }
  // father brother
  return person.father.mother.children.filter(child => child.id !== person.father.id && child.gender === Gender.Male)
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.PaternalUncle] = paternalUncle
}
