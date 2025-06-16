import { AnyBulkWriteOperation } from 'mongodb'
import {
  ClientSession,
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose'

import { UpdateType } from '../@types'

export abstract class BaseModel<T extends Document> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  // Add a new document to the collection
  async add(data: Partial<T>, session?: ClientSession | null): Promise<T> {
    const newDocument = new this.model(data)
    return await newDocument.save({ session })
  }

  async multiAdd(data: Partial<T>[]) {
    await this.model.insertMany(data)
    return
  }

  // Retrieve all documents (with optional filters)
  async get(filter: Partial<T> = {}): Promise<T[]> {
    return await this.model.find(filter as any)
  }
  async getOne(
    filter: Partial<T> = {},
  ): Promise<Omit<T, keyof Document> | null> {
    return await this.model.findOne(filter as any).lean()
  }

  // Retrieve a document by its ID
  async getByFieldAndValue(
    fieldName: keyof T,
    value: any,
  ): Promise<Omit<T, keyof Document> | null> {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: value,
      } as FilterQuery<T> // Dynamically appending 'Id'
      const result = await this.model.findOne(query).lean()

      return result as Omit<T, keyof Document> | null
    } catch (error) {
      console.error(`Error fetching document`, error)
      throw new Error('Error fetching document')
    }
  }

  // Update a document by its ID
  async update(
    { fieldName, value, updateData }: UpdateType<T>,
    session?: ClientSession | null,
  ): Promise<Omit<T, keyof Document> | null> {
    try {
      const query: FilterQuery<T> = { [fieldName]: value } as FilterQuery<T>

      const updatedDocument = await this.model
        .findOneAndUpdate(query, updateData, { session })
        .lean() // Ensuring we get plain object instead of a Mongoose document

      return updatedDocument as Omit<T, keyof Document> | null // Explicitly cast the result
    } catch (error) {
      console.error(`Error updating document  :`, error) // queryField used here
      throw new Error('Error updating document')
    }
  }

  async updateMany(
    { fieldName, value, updateData }: UpdateType<T>,
    session?: ClientSession | null,
  ) {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: { $in: value },
      } as FilterQuery<T> // Dynamically appending 'Id'
      await this.model.updateMany(query, updateData, { session })
      return
    } catch (error) {
      console.error(`Error updating document  :`, error) // queryField used here
      throw new Error('Error updating document')
    }
  }

  async deleteOne(
    fieldName: keyof T,
    value: any,
    session?: ClientSession | null,
  ) {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: value,
      } as FilterQuery<T> // Dynamically appending 'Id'
      await this.model.deleteOne(query, { session })
      return
    } catch (error) {
      console.error(`Error fetching document`, error)
      throw new Error('Error fetching document')
    }
  }

  async deleteMany(
    fieldName: keyof T,
    values: any,
    session?: ClientSession | null,
  ) {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: values,
      } as FilterQuery<T> // Dynamically appending 'Id'
      await this.model.deleteMany(query, { session })
      return
    } catch (error) {
      console.error(`Error fetching document`, error)
      throw new Error('Error fetching document')
    }
  }

  async deleteManyIds(
    fieldName: keyof T,
    values: string[],
    session?: ClientSession | null,
  ) {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: { $in: values },
      } as FilterQuery<T>

      await this.model.deleteMany(query, { session })
      return // you can return result.deletedCount or just result
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
