const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, max: 128 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    category_posts: [{ type: Schema.Types.ObjectId, ref: 'Post', required: false }] // posts that are related to this category
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


CategorySchema.virtual('id').get(() => this._id );/*
CategorySchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});
CategorySchema.virtual('subCategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: '_parentCategory',
  justOne: false
});
*/

module.exports = mongoose.model('Category', CategorySchema);