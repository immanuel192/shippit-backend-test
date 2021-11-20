import { Person, Gender } from './types'

const sampleData: Person[] = [
  // level 0
  {
    id: 'King Arthur',
    name: 'King Arthur',
    gender: Gender.Male,
    spouse: 'Queen Margret',
  },
  {
    id: 'Queen Margret',
    name: 'Queen Margret',
    gender: Gender.Female,
    spouse: 'King Arthur',
  },
  // level 1 ---------------------
  {
    id: 'Bill',
    name: 'Bill',
    gender: Gender.Male,
    spouse: 'Flora',
    father: 'King Arthur',
    mother: 'Queen Margret',
  },
  {
    id: 'Flora',
    name: 'Flora',
    gender: Gender.Female,
    spouse: 'Bill',
  },
  //
  {
    id: 'Charlie',
    name: 'Charlie',
    gender: Gender.Male,
    father: 'King Arthur',
    mother: 'Queen Margret',
  },
  //
  {
    id: 'Percy',
    name: 'Percy',
    gender: Gender.Male,
    spouse: 'Audrey',
    father: 'King Arthur',
    mother: 'Queen Margret',
  },
  {
    id: 'Audrey',
    name: 'Audrey',
    gender: Gender.Female,
    spouse: 'Percy',
  },
  //
  {
    id: 'Ronald',
    name: 'Ronald',
    gender: Gender.Male,
    spouse: 'Helen',
    father: 'King Arthur',
    mother: 'Queen Margret',
  },
  {
    id: 'Helen',
    name: 'Helen',
    gender: Gender.Female,
    spouse: 'Ronald',
  },
  //
  {
    id: 'Ginerva',
    name: 'Ginerva',
    gender: Gender.Female,
    spouse: 'Harry',
    father: 'King Arthur',
    mother: 'Queen Margret',
  },
  {
    id: 'Harry',
    name: 'Harry',
    gender: Gender.Male,
    spouse: 'Ginerva',
  },
  // level 2 ------------- Bill & Flora
  {
    id: 'Victoire',
    name: 'Victoire',
    gender: Gender.Female,
    spouse: 'Ted',
    father: 'Bill',
    mother: 'Flora',
  },
  {
    id: 'Ted',
    name: 'Ted',
    gender: Gender.Male,
    spouse: 'Victoire',
  },
  //
  {
    id: 'Dominique',
    name: 'Dominique',
    gender: Gender.Female,
    father: 'Bill',
    mother: 'Flora',
  },
  //
  {
    id: 'Louis',
    name: 'Louis',
    gender: Gender.Male,
    father: 'Bill',
    mother: 'Flora',
  },
  // level 2 ------------- Percy & Audrey
  {
    id: 'Molly',
    name: 'Molly',
    gender: Gender.Female,
    father: 'Percy',
    mother: 'Audrey',
  },
  {
    id: 'Lucy',
    name: 'Lucy',
    gender: Gender.Female,
    father: 'Percy',
    mother: 'Audrey',
  },
  // level 2 ------------- Ronald & Helen
  {
    id: 'Hugo',
    name: 'Hugo',
    gender: Gender.Male,
    father: 'Ronald',
    mother: 'Helen',
  },
  //
  {
    id: 'Rose',
    name: 'Rose',
    gender: Gender.Female,
    spouse: 'Malfoy',
    father: 'Ronald',
    mother: 'Helen',
  },
  {
    id: 'Malfoy',
    name: 'Malfoy',
    gender: Gender.Male,
    spouse: 'Rose',
  },
  // level 2 ------------- Ginerva & Harry
  {
    id: 'James',
    name: 'James',
    gender: Gender.Male,
    spouse: 'Darcy',
    mother: 'Ginerva',
    father: 'Harry',
  },
  {
    id: 'Darcy',
    name: 'Darcy',
    gender: Gender.Female,
    spouse: 'James',
  },
  //
  {
    id: 'Albus',
    name: 'Albus',
    gender: Gender.Male,
    spouse: 'Alice',
    mother: 'Ginerva',
    father: 'Harry',
  },
  {
    id: 'Alice',
    name: 'Alice',
    gender: Gender.Female,
    spouse: 'Albus',
  },
  //
  {
    id: 'Lily',
    name: 'Lily',
    gender: Gender.Female,
    mother: 'Ginerva',
    father: 'Harry',
  },
  // level 3 ------------- Victoire & Ted
  {
    id: 'Remus',
    name: 'Remus',
    gender: Gender.Male,
    father: 'Ted',
    mother: 'Victoire',
  },
  // level 3 ------------- Malfoy & Rose
  {
    id: 'Draco',
    name: 'Draco',
    gender: Gender.Male,
    father: 'Malfoy',
    mother: 'Rose',
  },
  {
    id: 'Aster',
    name: 'Aster',
    gender: Gender.Female,
    father: 'Malfoy',
    mother: 'Rose',
  },
  // level 3 ------------- James & Darcy
  {
    id: 'William',
    name: 'William',
    gender: Gender.Male,
    father: 'James',
    mother: 'Darcy',
  },
  // level 3 ------------- Albus & Alice
  {
    id: 'Ron',
    name: 'Ron',
    gender: Gender.Male,
    father: 'Albus',
    mother: 'Alice',
  },
  {
    id: 'Ginny',
    name: 'Ginny',
    gender: Gender.Female,
    father: 'Albus',
    mother: 'Alice',
  },

]

export { sampleData }
