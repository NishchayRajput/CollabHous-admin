import { model, Schema } from 'mongoose'

export interface Person {
  name: string
  age: number
}

export const PersonSchema = new Schema<Person>({
  name: { type: String, required: true },
  age: { type: Number, required: true }
})

export const PersonModel = model<Person>('Person', PersonSchema)
