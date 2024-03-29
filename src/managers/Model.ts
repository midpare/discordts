import mongoose, { Schema, ResolveSchemaOptions, model } from 'mongoose';

export class Model<T> {
  public name: string
  public model: mongoose.Model<T, {}, {}, {}, any>;
  
  constructor(name: string, schema: Schema<T, mongoose.Model<T, any, any, any, any>, {}, {}, {}, {}, ResolveSchemaOptions<"type">>) {
    this.name = name;
    this.model = model<T>(name, schema);
  }
}