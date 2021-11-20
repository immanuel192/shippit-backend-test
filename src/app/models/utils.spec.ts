import { suiteName } from '../../../test/utils'
import * as dataService from '../data'
import { Person } from '../data/types'
import { buildFamilyTree } from './utils'

describe(suiteName(__filename), () => {
  afterEach(jest.restoreAllMocks)

  describe('buildFamilyTree', () => {
    let spyLoadPersons: jest.SpyInstance

    beforeEach(() => {
      spyLoadPersons = jest.spyOn(dataService, 'loadPersons')
    })

    function setupTest(persons: Person[]) {
      spyLoadPersons.mockResolvedValue([...persons])
      return buildFamilyTree()
    }

    it('should generate family tree based on input and index it as well', async () => {

      const data = [
        {
          id: 'King Arthur',
          name: 'King Arthur',
          gender: dataService.Gender.Male,
        },
      ]
      const { dictionary, root } = await setupTest(data)

      expect(spyLoadPersons).toBeCalledTimes(1)
      expect(dictionary.has(data[0].name)).toBeTruthy()
      expect(root).toMatchObject({
        id: data[0].id,
        name: data[0].name,
        gender: data[0].gender,
        spouse: null,
        father: null,
        mother: null,
        children: [],
      })

    })

    it('should generate father relationship', async () => {

      const data = [
        {
          id: 'father',
          name: 'father',
          gender: dataService.Gender.Male,
        },
        {
          id: 'child',
          name: 'child',
          gender: dataService.Gender.Male,
          father: 'father',
        },
      ]
      const { dictionary, root } = await setupTest(data)

      expect(spyLoadPersons).toBeCalledTimes(1)

      expect(dictionary.has(data[0].name)).toBeTruthy()
      expect(dictionary.has(data[1].name)).toBeTruthy()

      expect(root).toMatchObject({
        id: data[0].id,
        name: data[0].name,
        gender: data[0].gender,
        spouse: null,
        father: null,
        mother: null,
        children: expect.arrayContaining([
          expect.objectContaining({
            id: data[1].id,
            name: data[1].name,
            gender: data[1].gender,
            father: expect.objectContaining({ id: data[0].id }),
          }),
        ]),
      })
    })

    it('should generate mother relationship', async () => {

      const data = [
        {
          id: 'mother',
          name: 'mother',
          gender: dataService.Gender.Female,
        },
        {
          id: 'child',
          name: 'child',
          gender: dataService.Gender.Male,
          mother: 'mother',
        },
      ]
      const { dictionary, root } = await setupTest(data)

      expect(spyLoadPersons).toBeCalledTimes(1)

      expect(dictionary.has(data[0].name)).toBeTruthy()
      expect(dictionary.has(data[1].name)).toBeTruthy()

      expect(root).toMatchObject({
        id: data[0].id,
        name: data[0].name,
        gender: data[0].gender,
        spouse: null,
        father: null,
        mother: null,
        children: expect.arrayContaining([
          expect.objectContaining({
            id: data[1].id,
            name: data[1].name,
            gender: data[1].gender,
            mother: expect.objectContaining({ id: data[0].id }),
          }),
        ]),
      })
    })

    it('should generate spouse relationship', async () => {

      const data = [
        {
          id: 'husband',
          name: 'husband',
          gender: dataService.Gender.Male,
          spouse: 'wife',
        },
        {
          id: 'wife',
          name: 'wife',
          gender: dataService.Gender.Female,
          spouse: 'husband',
        },
      ]
      const { dictionary, root } = await setupTest(data)

      expect(spyLoadPersons).toBeCalledTimes(1)

      expect(dictionary.has(data[0].name)).toBeTruthy()
      expect(dictionary.has(data[1].name)).toBeTruthy()

      expect(root).toMatchObject({
        id: data[0].id,
        name: data[0].name,
        gender: data[0].gender,
        spouse: expect.objectContaining({
          id: data[1].id,
          name: data[1].name,
          gender: data[1].gender,
          spouse: expect.objectContaining({ id: data[0].id }),
        }),
        father: null,
        mother: null,
        children: [],
      })
    })

    it('should generate family relationship', async () => {

      const data = [
        {
          id: 'father',
          name: 'father',
          gender: dataService.Gender.Male,
          spouse: 'mom',
        },
        {
          id: 'mom',
          name: 'mom',
          gender: dataService.Gender.Female,
          spouse: 'father',
        },
        {
          id: 'daughter',
          name: 'daughter',
          gender: dataService.Gender.Female,
          father: 'father',
          mother: 'mom',
        },
        {
          id: 'son',
          name: 'son',
          gender: dataService.Gender.Male,
          father: 'father',
          mother: 'mom',
          spouse: 'son-wife',
        },
        {
          id: 'son-wife',
          name: 'son-wife',
          gender: dataService.Gender.Female,
          spouse: 'son',
        },
      ]
      const { dictionary, root } = await setupTest(data)

      expect(spyLoadPersons).toBeCalledTimes(1)

      expect(dictionary.has(data[0].name)).toBeTruthy()
      expect(dictionary.has(data[1].name)).toBeTruthy()
      expect(dictionary.has(data[2].name)).toBeTruthy()
      expect(dictionary.has(data[3].name)).toBeTruthy()

      const expectChildExisted = expect.arrayContaining([
        expect.objectContaining({
          id: data[2].id,
          name: data[2].name,
          gender: data[2].gender,
          father: expect.objectContaining({ id: data[0].id }),
          mother: expect.objectContaining({ id: data[1].id }),
        }),
        expect.objectContaining({
          id: data[3].id,
          name: data[3].name,
          gender: data[3].gender,
          father: expect.objectContaining({ id: data[0].id }),
          mother: expect.objectContaining({ id: data[1].id }),
          spouse: expect.objectContaining({
            id: data[4].id,
            name: data[4].name,
            gender: data[4].gender,
            father: null,
            mother: null,
            spouse: expect.objectContaining({ id: data[3].id }),
          }),
        }),
      ])

      expect(root).toMatchObject({
        id: data[0].id,
        name: data[0].name,
        gender: data[0].gender,
        spouse: expect.objectContaining({
          id: data[1].id,
          name: data[1].name,
          gender: data[1].gender,
          father: null,
          mother: null,
          spouse: expect.objectContaining({ id: data[0].id }),
          children: expectChildExisted,
        }),
        father: null,
        mother: null,
        children: expectChildExisted,
      })

      expect(root.children).toHaveLength(2)
      expect(root.spouse.children).toHaveLength(2)
    })

    it('throw exception if we have orphans person', async () => {

      const data = [
        {
          id: 'husband',
          name: 'husband',
          gender: dataService.Gender.Male,
        },
        {
          id: 'wife',
          name: 'wife',
          gender: dataService.Gender.Female,
          spouse: 'stranger',
        },
      ]

      await expect(setupTest(data)).rejects.toMatchObject({
        message: 'Found 1 orphans person',
      })

    })

  })

})
