import { Person } from './types'
import { sampleData } from './sample-data'

export { Gender } from './types'

export const loadPersons = async (): Promise<Person[]> => {
  // Deep clone to prevent unwanted error
  return Promise.resolve(JSON.parse(JSON.stringify(sampleData)))
}
