import { Gender } from './data'

export enum CommandType {
  ADD_CHILD = 'ADD_CHILD',
  GET_RELATIONSHIP = 'GET_RELATIONSHIP'
}

export enum PersonRelationshipType {
  PaternalUncle = 'Paternal-Uncle',
  MaternalUncle = 'Maternal-Uncle',
  PaternalAunt = 'Paternal-Aunt',
  MaternalAunt = 'Maternal-Aunt',
  SisterInLaw = 'Sister-In-Law',
  BrotherInLaw = 'Brother-In-Law',
  Son = 'Son',
  Daughter = 'Daughter',
  Siblings = 'Siblings',
}

export interface RawCommand {
  command: CommandType
  params: string[]
}

export interface FamilyTreeNode {
  id: string
  name: string
  gender: Gender
  spouse?: FamilyTreeNode
  father?: FamilyTreeNode
  mother?: FamilyTreeNode
  children: FamilyTreeNode[]
}
