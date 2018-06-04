const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 128 },
    description: { type: String, required: true, max: 128 },
    body: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    _status: { type: Schema.Types.ObjectId, ref: 'Status', required: false },
    _user:{ type: Schema.Types.ObjectId, ref: 'User', required: false}, // user that made it
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: false }],
    liked_users: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }] // users that liked this post
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


PostSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Post', PostSchema);