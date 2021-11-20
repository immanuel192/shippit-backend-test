import { suiteName } from '../utils'
import { CommandType, RawCommand } from '../../src/app/types'
import { main } from '../../src/app/app'

describe(suiteName(__filename), () => {
  it('should add child', async () => {
    const addChildCommand: RawCommand = {
      command: CommandType.ADD_CHILD,
      params: ['Flora', 'Minerva', 'Female'],
    }

    await expect(main([addChildCommand])).resolves.toEqual(['CHILD_ADDED'])
  })
})
