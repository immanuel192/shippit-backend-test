import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { register, sisterInLaw } from './sister-in-law'
import { buildFamilyTree } from '../../../models/utils'
import { LengaburuFamily } from '../../../models/lengaburu-family'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.SisterInLaw]: sisterInLaw,
      })
    })
  })

  describe('sisterInLaw', () => {
    let family: LengaburuFamily

    beforeAll(async () => {
      const { dictionary, root } = await buildFamilyTree()
      family = new LengaburuFamily(root, dictionary)
    })

    it('should get sister in law of Lily', async () => {
      const person = await family.find('Lily')
      const result = await sisterInLaw(person)
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Darcy',
        }),
        expect.objectContaining({
          id: 'Alice',
        }),
      ]))
    })

    it('should get sister in law of Ronald', async () => {
      const person = await family.find('Ronald')
      const result = await sisterInLaw(person)
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Flora',
        }),
        expect.objectContaining({
          id: 'Audrey',
        }),
      ]))
    })

    it('should get sister in law of Roese', async () => {
      const person = await family.find('Rose')
      const result = await sisterInLaw(person)
      expect(result).toHaveLength(0)
    })

  })

})
