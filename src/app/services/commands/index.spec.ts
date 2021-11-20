import { suiteName } from '../../../../test/utils'
import { CommandType } from '../../types'
import { getAvailableCommands } from './index'

describe(suiteName(__filename), () => {
  describe('getAvailableCommands', () => {
    it('ADD_CHILD should be registered', () => {
      expect(getAvailableCommands(null)).toMatchObject({
        [CommandType.ADD_CHILD]: expect.any(Function),
      })
    })

    it('GET_RELATIONSHIP should be registered', () => {
      expect(getAvailableCommands(null)).toMatchObject({
        [CommandType.GET_RELATIONSHIP]: expect.any(Function),
      })
    })
  })
})
