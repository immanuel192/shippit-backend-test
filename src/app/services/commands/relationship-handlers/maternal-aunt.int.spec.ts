import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { register, maternalAunt } from './maternal-aunt'
import { buildFamilyTree } from '../../../models/utils'
import { LengaburuFamily } from '../../../models/lengaburu-family'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.MaternalAunt]: maternalAunt,
      })
    })
  })

  describe('maternalAunt', () => {
    let family: LengaburuFamily

    beforeAll(async () => {
      const { dictionary, root } = await buildFamilyTree()
      family = new LengaburuFamily(root, dictionary)
    })

    it('should get maternal aunt of Remus', async () => {
      const person = await family.find('Remus')
      const result = await maternalAunt(person)
      expect(result).toHaveLength(1)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Dominique',
        }),
      ]))
    })

    it('should get sister in law of Aster', async () => {
      const person = await family.find('Aster')
      const result = await maternalAunt(person)
      expect(result).toHaveLength(0)
    })

  })

})
