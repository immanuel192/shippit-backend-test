import { chance, suiteName } from '../../../../test/utils'
import { GetRelationshipResult } from '../../models'
import { CommandType, PersonRelationshipType, RawCommand } from '../../types'
import { commandGetRelationship, relationShipHandlers } from './get-relationship'
import { son } from './relationship-handlers/son'

describe(suiteName(__filename), () => {
  let command: RawCommand
  const family = {
    find: jest.fn(),
  } as any

  beforeEach(() => {
    command = {
      command: CommandType.GET_RELATIONSHIP,
      params: [chance.name()],
    }
  })

  afterEach(jest.resetAllMocks)

  describe('relationShipHandlers', () => {
    it('should registered get Son', () => {
      expect(relationShipHandlers[PersonRelationshipType.Son]).toBe(son)
    })
  })

  describe('commandGetRelationship', () => {
    it('should throw exception if dont get valid args', async () => {
      command.params.shift()
      await expect(commandGetRelationship(null, command)).rejects.toMatchObject({
        message: `${command.command} command requires exactly 2 parameters`,
      })
    })

    it('should return NONE for invalid relationship type', async () => {
      command.params.push(chance.word())

      await expect(commandGetRelationship(null, command)).resolves.toBe(GetRelationshipResult.NONE)

    })

    it('should return PERSON_NOT_FOUND if person is not existed', async () => {
      command.params.push(PersonRelationshipType.Son)
      family.find.mockResolvedValue(null)

      await expect(commandGetRelationship(family, command)).resolves.toBe(GetRelationshipResult.PERSON_NOT_FOUND)
      expect(family.find).toHaveBeenCalledWith(command.params[0])
    })

    it('should return NONE no result from the handler', async () => {
      const type = PersonRelationshipType.Son
      command.params.push(type)
      const person = { [chance.word()]: chance.word() }

      family.find.mockResolvedValue(person)
      const backupHandler = relationShipHandlers[type]
      relationShipHandlers[type] = jest.fn().mockResolvedValue([])

      await expect(commandGetRelationship(family, command)).resolves.toBe(GetRelationshipResult.NONE)
      expect(family.find).toHaveBeenCalledWith(command.params[0])
      expect(relationShipHandlers[type]).toHaveBeenCalledWith(person)
      relationShipHandlers[type] = backupHandler
    })

    it('should return result', async () => {
      const type = PersonRelationshipType.Son
      command.params.push(type)
      const person = { [chance.word()]: chance.word() }
      const rawResult = [
        { name: chance.word() },
        { name: chance.word() },
        { name: chance.word() },
      ]
      const expectedResult = rawResult.map(({ name }) => name).join(' ')

      family.find.mockResolvedValue(person)
      const backupHandler = relationShipHandlers[type]
      relationShipHandlers[type] = jest.fn().mockResolvedValue(rawResult)

      await expect(commandGetRelationship(family, command)).resolves.toBe(expectedResult)
      expect(family.find).toHaveBeenCalledWith(command.params[0])
      expect(relationShipHandlers[type]).toHaveBeenCalledWith(person)
      relationShipHandlers[type] = backupHandler
    })

  })
})
