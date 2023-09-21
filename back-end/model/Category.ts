import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string,
  categoryKey: string,
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  }, 
  categoryKey: {
    type: String,
    required: true,
    unique: true,
  }
})


const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

export type {ICategory};