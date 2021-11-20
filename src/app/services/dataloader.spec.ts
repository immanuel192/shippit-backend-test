import * as fs from 'fs'
import { suiteName, chance } from '../../../test/utils'
import { loadArgsInput } from './dataloader'

describe(suiteName(__filename), () => {
  afterEach(jest.restoreAllMocks)

  describe('loadArgsInput', () => {
    it('should parse input from provided filename and return out', async () => {
      const filename = chance.string()
      const fileContent = 'ADD_CHILD Luna Lola Female\nCOMMAND'

      const spy = jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContent)
      const result = await loadArgsInput(filename)
      expect(result).toEqual([
        {
          command: 'ADD_CHILD',
          params: ['Luna', 'Lola', 'Female'],
        },
        {
          command: 'COMMAND',
          params: [],
        },
      ])
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(filename, { encoding: 'utf8' })
    })

    it('should ignore empty line', async () => {
      const filename = chance.string()
      const fileContent = 'ADD_CHILD Luna Lola Female\n'

      const spy = jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContent)
      const result = await loadArgsInput(filename)
      expect(result).toEqual([
        {
          command: 'ADD_CHILD',
          params: ['Luna', 'Lola', 'Female'],
        },
      ])
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(filename, { encoding: 'utf8' })
    })

    it('should throw exception out if any', async () => {
      const filename = chance.string()

      await expect(loadArgsInput(filename)).rejects.toMatchObject({
        code: 'ENOENT',
      })
    })
  })
})
