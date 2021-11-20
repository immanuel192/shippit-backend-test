import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { register, paternalAunt } from './paternal-aunt'
import { buildFamilyTree } from '../../../models/utils'
import { LengaburuFamily } from '../../../models/lengaburu-family'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.PaternalAunt]: paternalAunt,
      })
    })
  })

  describe('paternalAunt', () => {
    let family: LengaburuFamily

    beforeAll(async () => {
      const { dictionary, root } = await buildFamilyTree()
      family = new LengaburuFamily(root, dictionary)
    })

    it('should get paternal aunt of Ron', async () => {
      const person = await family.find('Ron')
      const result = await paternalAunt(person)
      expect(result).toHaveLength(1)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Lily',
        }),
      ]))
    })

    it('should get paternal aunt of Remus', async () => {
      const person = await family.find('Remus')
      const result = await paternalAunt(person)
      expect(result).toHaveLength(0)
    })

  })

})
