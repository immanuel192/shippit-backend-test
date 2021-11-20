import * as path from 'path'
import * as Chance from 'chance'

export const chance = new Chance()

export const suiteName = (file: string) => path.relative(`${__dirname}/../..`, file).split(path.sep).join('#')
