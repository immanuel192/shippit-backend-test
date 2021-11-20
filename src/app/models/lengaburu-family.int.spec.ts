import { suiteName } from '../../../test/utils'
import { Gender } from '../data'
import { AddChildResult, Family } from './interfaces'
import { LengaburuFamily } from './lengaburu-family'
import { buildFamilyTree } from './utils'

describe(suiteName(__filename), () => {
  let family: Family

  beforeAll(async () => {
    const { dictionary, root } = await buildFamilyTree()
    family = new LengaburuFamily(root, dictionary)
  })

  describe('find', () => {
    it('should find person by name', async () => {
      const person = await family.find('King Arthur')
      expect(person).toMatchObject({
        id: 'King Arthur',
        name: 'King Arthur',
        gender: Gender.Male,
      })
    })

    it('should return null if can not find one', async () => {
      const person = await family.find('Trung')
      expect(person).toBeFalsy()
    })
  })

  describe('theKing', () => {
    it('should return the king', () => {
      expect(family.theKing.id).toEqual('King Arthur')
    })
  })

  describe('addChild', () => {
    it('should add child to the family', async () => {
      await expect(family.addChild('Flora', 'Minerva', Gender.Female)).resolves.toEqual(AddChildResult.CHILD_ADDED)

      const [newChild, mom] = await Promise.all([
        family.find('Minerva'),
        family.find('Flora'),
      ])
      // a new child was born :D
      expect(newChild).toMatchObject({
        id: 'Minerva',
        name: 'Minerva',
        gender: Gender.Female,
        mother: expect.objectContaining({
          id: mom.id,
        }),
        father: expect.objectContaining({
          id: mom.spouse.id,
        }),
      })
      // and should be linked with mom and dad
      expect(mom.children).toContainEqual(newChild)
      expect(mom.spouse.children).toContainEqual(newChild)
    })

    it('should return PERSON NOT FOUND if mom not existed', async () => {
      const childName = 'Lola'
      await expect(family.addChild('Luna', childName, Gender.Female)).resolves.toEqual(AddChildResult.PERSON_NOT_FOUND)

      await expect(family.find(childName)).resolves.toBeFalsy()
    })

    it('should return CHILD_ADDITION_FAILED if mom is not Female', async () => {
      const childName = 'Bella'
      await expect(family.addChild('Ted', childName, Gender.Female)).resolves.toEqual(AddChildResult.CHILD_ADDITION_FAILED)

      await expect(family.find(childName)).resolves.toBeFalsy()
    })

    it('should return CHILD_ADDITION_FAILED when gender is not either male or female', async () => {
      await expect(family.addChild('Flora', 'Minerva', '' as any)).resolves.toEqual(AddChildResult.CHILD_ADDITION_FAILED)
    })

    it('should return CHILD_ADDITION_FAILED when child name length is 0', async () => {
      await expect(family.addChild('Flora', '', Gender.Female)).resolves.toEqual(AddChildResult.CHILD_ADDITION_FAILED)
    })

    it('should return CHILD_ADDITION_FAILED when child name existed', async () => {
      await expect(family.addChild('Alice', 'Ginny', Gender.Female)).resolves.toEqual(AddChildResult.CHILD_ADDITION_FAILED)
    })
  })

})
