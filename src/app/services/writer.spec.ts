import { suiteName, chance } from '../../../test/utils'
import { writeOutput } from './writer'

describe(suiteName(__filename), () => {
  afterEach(jest.restoreAllMocks)

  describe('loadArgsInput', () => {
    it('should write to output', async () => {
      const spy = jest.spyOn(console, 'log').mockReturnValue()

      const data = [chance.string(), chance.string()]
      await writeOutput(data)
      expect(spy).toHaveBeenCalledWith(data[0])
      expect(spy).toHaveBeenCalledWith(data[1])
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })
})
