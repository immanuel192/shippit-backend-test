import { suiteName } from '../../../test/utils'
import { loadPersons } from './index'

describe(suiteName(__filename), () => {
  describe('loadPersons', () => {
    it('should return data', () => {
      expect(loadPersons()).toBeInstanceOf(Promise)
    })
  })
})
