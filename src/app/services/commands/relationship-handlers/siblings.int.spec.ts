import { suiteName } from '../../../../../test/utils'
import { FamilyTreeNode, PersonRelationshipType } from '../../../types'
import { register, siblings } from './siblings'
import { buildFamilyTree } from '../../../models/utils'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.Siblings]: siblings,
      })
    })
  })

  describe('siblings', () => {
    let dic: Map<string, FamilyTreeNode>

    beforeAll(async () => {
      const { dictionary } = await buildFamilyTree()
      dic = dictionary
    })

    it('should get siblings of Percy', async () => {
      const person = dic.get('Percy')
      const result = await siblings(person)
      expect(result).toHaveLength(4)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Bill',
        }),
        expect.objectContaining({
          id: 'Charlie',
        }),
        expect.objectContaining({
          id: 'Ronald',
        }),
        expect.objectContaining({
          id: 'Ginerva',
        }),
      ]))
    })

    it('should get siblings of King Arthur', async () => {
      const person = dic.get('King Arthur')
      const result = await siblings(person)
      expect(result).toHaveLength(0)
    })

  })

})
