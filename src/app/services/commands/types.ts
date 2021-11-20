import { RawCommand } from '../../types'

export type CommandHandler = (command: RawCommand) => Promise<string>
