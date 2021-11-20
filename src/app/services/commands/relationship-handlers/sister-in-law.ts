import { Gender } from '../../../data'
import { PersonRelationshipType } from '../../../types'
import { RelationshipHandler, RelationshipManager } from './types'

export const sisterInLaw: RelationshipHandler = async (person) => {
  // wive of siblings
  const set1 = !person.mother ? [] : person.mother.children
    .filter(child => child.id !== person.id && child.gender === Gender.Male && child.spouse)
    .map(child => child.spouse)
  // spouse sister
  const set2 = !(person.spouse && person.spouse.mother) ? [] : person.spouse.mother.children
    .filter(child => child.id !== person.spouse.id && child.gender === Gender.Female)

  return [...set1, ...set2].reduce((acc, current) => {
    if (!acc.some(t => t.id === current.id)) {
      acc.push(current)
    }
    return acc
  }, [])
}

export const register = (manager: RelationshipManager) => {
  // eslint-disable-next-line no-param-reassign
  manager[PersonRelationshipType.SisterInLaw] = sisterInLaw
}
