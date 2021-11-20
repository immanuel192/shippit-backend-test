import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { registerAllRelationships } from './index'

describe(suiteName(__filename), () => {
  describe('registerAllRelationships', () => {
    it('should register all relationships', () => {
      const manager: any = {}
      registerAllRelationships(manager)
      expect(Object.keys(manager).length).toBe(9)

      expect(Object.keys(manager)).toContain(PersonRelationshipType.Son)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.Daughter)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.Siblings)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.BrotherInLaw)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.SisterInLaw)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.MaternalAunt)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.MaternalUncle)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.PaternalAunt)
      expect(Object.keys(manager)).toContain(PersonRelationshipType.PaternalUncle)
    })
  })
})
