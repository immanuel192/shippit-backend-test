import { RelationshipManager } from './types'
import { register as registerSon } from './son'
import { register as registerDaughter } from './daughter'
import { register as registerSiblings } from './siblings'
import { register as registerBrotherInLaw } from './brother-in-law'
import { register as registerSisterInLaw } from './sister-in-law'
import { register as registerMaternalAunt } from './maternal-aunt'
import { register as registerMaternalUncle } from './maternal-uncle'
import { register as registerPaternalAunt } from './paternal-aunt'
import { register as registerPaternalUncle } from './paternal-uncle'

export const registerAllRelationships = (manager: RelationshipManager) => {
  [
    registerSon,
    registerDaughter,
    registerSiblings,
    registerBrotherInLaw,
    registerSisterInLaw,
    registerMaternalAunt,
    registerMaternalUncle,
    registerPaternalAunt,
    registerPaternalUncle,
  ]
    .forEach(handler => handler(manager))
}
