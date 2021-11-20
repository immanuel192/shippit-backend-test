import { Gender } from '../data'
import { FamilyTreeNode } from '../types'
import { AddChildResult, Family } from './interfaces'
import { createFamilyNode } from './utils'

export class LengaburuFamily implements Family {

  constructor(
    private nodeKing: FamilyTreeNode,
    private dictionary: Map<string, FamilyTreeNode>,
  ) { }

  get theKing() {
    return this.nodeKing
  }

  async find(name: string) {
    return this.dictionary.get(name)
  }

  async addChild(motherName: string, childName: string, gender: Gender) {
    const mother = await this.find(motherName)
    if (!mother) {
      return AddChildResult.PERSON_NOT_FOUND
    }

    if (mother.gender !== Gender.Female
      || !Object.values(Gender).includes(gender)
      || childName.trim().length === 0
    ) {
      return AddChildResult.CHILD_ADDITION_FAILED
    }

    if (await this.find(childName)) {
      return AddChildResult.CHILD_ADDITION_FAILED
    }

    const child = createFamilyNode({
      id: childName,
      name: childName,
      gender,
    })
    child.mother = mother
    child.father = mother.spouse
    //
    mother.children.push(child)
    mother.spouse.children.push(child)
    //
    this.dictionary.set(child.name, child)

    return AddChildResult.CHILD_ADDED
  }
}
