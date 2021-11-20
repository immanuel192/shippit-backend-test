import { suiteName } from '../../../../../test/utils'
import { FamilyTreeNode, PersonRelationshipType } from '../../../types'
import { register, daughter } from './daughter'
import { buildFamilyTree } from '../../../models/utils'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.Daughter]: daughter,
      })
    })
  })

  describe('daughter', () => {
    let dic: Map<string, FamilyTreeNode>

    beforeAll(async () => {
      const { dictionary } = await buildFamilyTree()
      dic = dictionary
    })

    it('should get daughter of Albus', async () => {
      const albus = dic.get('Albus')
      const result = await daughter(albus)
      expect(result).toHaveLength(1)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Ginny',
        }),
      ]))
    })

    it('should get daughter of Molly', async () => {
      const person = dic.get('Molly')
      const result = await daughter(person)
      expect(result).toHaveLength(0)
    })

  })

})
