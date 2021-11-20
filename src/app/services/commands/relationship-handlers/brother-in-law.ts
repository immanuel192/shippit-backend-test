import { Gender } from '../../../data'
import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const brotherInLaw: RelationshipHandler = async (person) => {
  // the husband of your sister,
  const set1 = !person.mother ? [] : person.mother.children
    .filter(child => child.id !== person.id && child.gender === Gender.Female && child.spouse)
    .map(child => child.spouse)
  // or the brother of your husband or wife
  const set2 = !(person.spouse && person.spouse.mother) ? [] : person.spouse.mother.children
    .filter(child => child.id !== person.spouse.id && child.gender === Gender.Male)

  return [...set1, ...set2].reduce((acc, current) => {
    if (!acc.some(t => t.id === current.id)) {
      acc.push(current)
    }
    return acc
  }, [])
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.BrotherInLaw] = brotherInLaw
}
