import mongoose, { Document, Schema } from 'mongoose';

interface Hero extends Document {
  page: string;
  key: string;
  value: string;
}

const heroSchema = new Schema<Hero>({
  page: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

// Create and export the 'hero' model based on the schema
const HeroModel = mongoose.model<Hero>('hero', heroSchema, 'blog_hero');

export default HeroModel;
