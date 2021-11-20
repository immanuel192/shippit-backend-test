import { readFileSync } from 'fs'
import { CommandType, RawCommand } from '../types'

export const loadArgsInput = async (filename: string): Promise<RawCommand[]> => {
  const file = await readFileSync(filename, { encoding: 'utf8' })
  const commands = file.split('\n')
  return commands.map((command) => {
    const [commandType, ...params] = command.split(' ')
    if (commandType) {
      return { command: commandType as CommandType, params }
    }
    return null
  }).reduce((acc, command) => {
    if (command) { acc.push(command) }
    return acc
  }, [] as RawCommand[])
}
