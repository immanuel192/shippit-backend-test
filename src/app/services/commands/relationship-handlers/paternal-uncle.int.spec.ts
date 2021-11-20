import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { register, paternalUncle } from './paternal-uncle'
import { buildFamilyTree } from '../../../models/utils'
import { LengaburuFamily } from '../../../models/lengaburu-family'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.PaternalUncle]: paternalUncle,
      })
    })
  })

  describe('paternalUncle', () => {
    let family: LengaburuFamily

    beforeAll(async () => {
      const { dictionary, root } = await buildFamilyTree()
      family = new LengaburuFamily(root, dictionary)
    })

    it('should get paternal uncle of Ginny', async () => {
      const person = await family.find('Ginny')
      const result = await paternalUncle(person)
      expect(result).toHaveLength(1)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'James',
        }),
      ]))
    })

    it('should get paternal uncle of Draco', async () => {
      const person = await family.find('Draco')
      const result = await paternalUncle(person)
      expect(result).toHaveLength(0)
    })

  })

})
