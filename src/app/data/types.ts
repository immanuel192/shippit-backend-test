export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export interface Person {
  id: string
  name: string
  gender: Gender
  spouse?: string // FK of Person eventually
  father?: string // FK of Person eventually
  mother?: string // FK of Person eventually
}
