import { Gender } from '../../../data'
import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const maternalAunt: RelationshipHandler = async (person) => {
  if (!(person.mother && person.mother.mother)) {
    return []
  }
  // mother sisters
  return person.mother.mother.children.filter(child => child.id !== person.mother.id && child.gender === Gender.Female)
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.MaternalAunt] = maternalAunt
}
