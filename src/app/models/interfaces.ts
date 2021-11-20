import { Gender } from 'data'
import { FamilyTreeNode } from '../types'

export enum AddChildResult {
  CHILD_ADDED = 'CHILD_ADDED',
  PERSON_NOT_FOUND = 'PERSON_NOT_FOUND',
  CHILD_ADDITION_FAILED = 'CHILD_ADDITION_FAILED'
}

export enum GetRelationshipResult {
  NONE = 'NONE',
  PERSON_NOT_FOUND = 'PERSON_NOT_FOUND',
}

export interface Family {
  /**
   * Get the King, root of the family tree
   */
  get theKing(): FamilyTreeNode
  /**
   * Find member by their name or id
   * @param name Family member name
   */
  find(name: string): Promise<FamilyTreeNode>

  /**
   *
   * @param mother
   * @param child
   * @param gender
   * @returns Return status of the operation
   */
  addChild(mother: string, child: string, gender: Gender): Promise<AddChildResult>
}
