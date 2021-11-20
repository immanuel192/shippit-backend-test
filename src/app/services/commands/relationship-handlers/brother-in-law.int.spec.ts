import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { register, brotherInLaw } from './brother-in-law'
import { buildFamilyTree } from '../../../models/utils'
import { LengaburuFamily } from '../../../models/lengaburu-family'
import { Gender } from '../../../data'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.BrotherInLaw]: brotherInLaw,
      })
    })
  })

  describe('brotherInLaw', () => {
    let family: LengaburuFamily

    beforeAll(async () => {
      const { dictionary, root } = await buildFamilyTree()
      family = new LengaburuFamily(root, dictionary)
    })

    it('should get brother in law of Percy', async () => {
      const person = await family.find('Percy')
      const result = await brotherInLaw(person)
      expect(result).toHaveLength(1)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Harry',
        }),
      ]))
    })

    it('should get brother in law of Darcy', async () => {
      const person = await family.find('Darcy')
      const result = await brotherInLaw(person)
      expect(result).toHaveLength(1)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Albus',
        }),
      ]))
    })

    it('should get brother in law of new member', async () => {

      await family.addChild('Queen Margret', 'Test', Gender.Female)

      // manually add husband for this Test user
      const testUser = await family.find('Test')
      testUser.spouse = { id: 'Test 2', name: 'Test2', gender: Gender.Male, children: [] }

      const person = await family.find('Percy')
      const result = await brotherInLaw(person)
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Harry',
        }),
        expect.objectContaining({
          id: 'Test 2',
        }),
      ]))
    })

  })

})
