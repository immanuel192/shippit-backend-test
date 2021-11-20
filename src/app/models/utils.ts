import * as bluebird from 'bluebird'
import { loadPersons } from '../data'
import { Person } from '../data/types'
import { FamilyTreeNode } from '../types'

export const createFamilyNode = (person: Person): FamilyTreeNode => {
  return {
    id: person.id,
    name: person.name,
    children: [],
    gender: person.gender,
    father: null,
    mother: null,
    spouse: null,
  }
}

type MapAbleFields = keyof Pick<Person, 'father' | 'mother' | 'spouse'>

/**
 * Field mapping when build the family tree
 */
const fieldMaps = {
  father: { isChildren: true },
  mother: { isChildren: true },
  spouse: { isChildren: false },
}
/**
 * Build the Lengabugu Family Tree
 * @returns
 */
export const buildFamilyTree = async () => {
  const persons = await loadPersons()
  const dictionary = new Map<string, FamilyTreeNode>()

  const indexPerson = (person: FamilyTreeNode) => {
    dictionary.set(person.name, person)
  }

  const addIfNotExist = (person: FamilyTreeNode, childrenList: FamilyTreeNode[]) => {
    if (!childrenList.some(child => child.name === person.name)) {
      childrenList.push(person)
    }
  }

  const orphans = new Map<string, { node: FamilyTreeNode, person: Person }>()

  // load the king
  const nodeKing = createFamilyNode(persons[0])
  indexPerson(nodeKing)
  persons.shift()

  // load the rest of the family
  await bluebird.mapSeries(persons, async (person: Person) => {
    const node = createFamilyNode(person)

    await bluebird.map(Object.keys(fieldMaps), async (field: MapAbleFields) => {
      const { isChildren } = fieldMaps[field]
      const relatedPersonId = person[field]

      if (relatedPersonId) {
        const relatedPerson = dictionary.get(relatedPersonId)
        if (!relatedPerson) {
          orphans.set(person.name, { node, person })
          return
        }
        if (isChildren) {
          node[field] = relatedPerson
          addIfNotExist(node, relatedPerson.children)
          if (relatedPerson.spouse) {
            addIfNotExist(node, relatedPerson.spouse.children)
          }
        } else {
          node[field] = relatedPerson
          relatedPerson[field] = node
        }

        if (orphans.has(relatedPersonId)) {
          orphans.delete(relatedPersonId)
        }
      }
    })
    //
    indexPerson(node)
  })
  if (orphans.size > 0) {
    throw new Error(`Found ${orphans.size} orphans person`)
  }

  return {
    root: nodeKing, dictionary,
  }
}
