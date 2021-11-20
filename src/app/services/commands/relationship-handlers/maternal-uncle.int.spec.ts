import { suiteName } from '../../../../../test/utils'
import { PersonRelationshipType } from '../../../types'
import { register, maternalUncle } from './maternal-uncle'
import { buildFamilyTree } from '../../../models/utils'
import { LengaburuFamily } from '../../../models/lengaburu-family'

describe(suiteName(__filename), () => {
  describe('register', () => {
    it('should register the handler', () => {
      const manager: any = {}
      register(manager)
      expect(manager).toMatchObject({
        [PersonRelationshipType.MaternalUncle]: maternalUncle,
      })
    })
  })

  describe('maternalUncle', () => {
    let family: LengaburuFamily

    beforeAll(async () => {
      const { dictionary, root } = await buildFamilyTree()
      family = new LengaburuFamily(root, dictionary)
    })

    it('should get maternal uncle of James', async () => {
      const person = await family.find('James')
      const result = await maternalUncle(person)
      expect(result).toHaveLength(4)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 'Bill',
        }),
        expect.objectContaining({
          id: 'Charlie',
        }),
        expect.objectContaining({
          id: 'Percy',
        }),
        expect.objectContaining({
          id: 'Ronald',
        }),
      ]))
    })

    it('should get maternal uncle of Ron', async () => {
      const person = await family.find('Ron')
      const result = await maternalUncle(person)
      expect(result).toHaveLength(0)
    })

  })

})
