import { suiteName } from '../utils'
import { main } from '../../src/app/app'

describe(suiteName(__filename), () => {
  it('example file 1', async () => {
    const commands = [
      {
        command: 'ADD_CHILD',
        params: ['Flora', 'Minerva', 'Female'],
      },
      {
        command: 'GET_RELATIONSHIP',
        params: ['Remus', 'Maternal-Aunt'],
      },
      {
        command: 'GET_RELATIONSHIP',
        params: ['Minerva', 'Siblings'],
      },
    ]

    await expect(main(commands as any)).resolves.toEqual([
      'CHILD_ADDED',
      'Dominique Minerva',
      'Victoire Dominique Louis',
    ])
  })

  it('example Sample 1', async () => {
    const commands = [
      {
        command: 'ADD_CHILD',
        params: ['Luna', 'Lola', 'Female'],
      },
      {
        command: 'GET_RELATIONSHIP',
        params: ['Luna', 'Maternal-Aunt'],
      },
    ]

    await expect(main(commands as any)).resolves.toEqual([
      'PERSON_NOT_FOUND',
      'PERSON_NOT_FOUND',
    ])
  })

  it('example Sample 2', async () => {
    const commands = [
      {
        command: 'ADD_CHILD',
        params: ['Ted', 'Bella', 'Female'],
      },
      {
        command: 'GET_RELATIONSHIP',
        params: ['Remus', 'Siblings'],
      },
    ]

    await expect(main(commands as any)).resolves.toEqual([
      'CHILD_ADDITION_FAILED',
      'NONE',
    ])
  })

  it('example Sample 3', async () => {
    const commands = [
      {
        command: 'GET_RELATIONSHIP',
        params: ['Lily', 'Sister-In-Law'],
      },
    ]

    await expect(main(commands as any)).resolves.toEqual([
      'Darcy Alice',
    ])
  })
})
