import { suiteName } from '../../../../../test/utils'
import { FamilyTreeNode, PersonRelationshipType } from '../../../types'
import { register, son } from './son'
import { buildFamilyTree } from '../../../models/utils'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.Son]: son,
      })
    })
  })

  describe('son', () => {
    let dic: Map<string, FamilyTreeNode>

    beforeAll(async () => {
      const { dictionary } = await buildFamilyTree()
      dic = dictionary
    })

    it('should get son of Harry', async () => {
      const harry = dic.get('Harry')
      const result = await son(harry)
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'James',
        }),
        expect.objectContaining({
          id: 'Albus',
        }),
      ]))
    })

    it('should get son of Audrey', async () => {
      const audrey = dic.get('Audrey')
      const result = await son(audrey)
      expect(result).toHaveLength(0)
    })

  })

})
