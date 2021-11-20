import { suiteName } from '../utils'
import { main } from '../../src/app/app'

describe(suiteName(__filename), () => {

  afterEach(jest.restoreAllMocks)

  it('should receive error for unknown command', async () => {
    const command = {
      command: 'ADD_HUSBAND',
      params: ['Flora', 'Minerva', 'Female'],
    }

    await expect(main([command] as any)).rejects.toMatchObject({
      message: `Unknown ${command.command}`,
    })
  })
})
