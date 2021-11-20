import { suiteName, chance } from '../../../../test/utils'
import { CommandType, RawCommand } from '../../types'
import { commandAddChild } from './add-child'

describe(suiteName(__filename), () => {
  let command: RawCommand

  beforeEach(() => {
    command = {
      command: CommandType.ADD_CHILD,
      params: [chance.string(), chance.string(), chance.string()],
    }
  })
  describe('commandAddChild', () => {
    it('should throw exception if args length less than 3', async () => {
      command.params.shift()
      await expect(commandAddChild(null, command)).rejects.toMatchObject({
        message: `${command.command} command requires exactly 3 parameters`,
      })
    })

    it('should call the family.addChild', async () => {
      const expectedResult = chance.word()
      const mockFamily = {
        addChild: jest.fn().mockResolvedValue(expectedResult),
      }

      await expect(commandAddChild(mockFamily as any, command)).resolves.toBe(expectedResult)
      expect(mockFamily.addChild).toHaveBeenCalledTimes(1)
      expect(mockFamily.addChild).toHaveBeenCalledWith(command.params[0], command.params[1], command.params[2])

    })

    it('should pass the exception all the way out', async () => {
      const rawError = new Error(chance.string())
      const mockFamily = {
        addChild: jest.fn().mockRejectedValue(rawError),
      }

      await expect(commandAddChild(mockFamily as any, command)).rejects.toEqual(rawError)

    })
  })
})
