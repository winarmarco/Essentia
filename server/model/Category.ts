import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string,
  key: string,
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  }, 
  key: {
    type: String,
    required: true,
    unique: true,
  }
})


const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

export type {ICategory};