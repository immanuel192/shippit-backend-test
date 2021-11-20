import { FamilyTreeNode } from '../../../types'

export type RelationshipHandler = (person: FamilyTreeNode) => Promise<FamilyTreeNode[]>

export type RelationshipManager = {
  [k: string]: RelationshipHandler
}
