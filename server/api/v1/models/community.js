const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new mongoose.Schema(
  {
    community: { type: String, required: true, max: 128 },
    description: { type: String, required: true, max: 256 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    __created_by:{ type: Schema.Types.ObjectId, ref: 'User'}, // a user can only create one
    _status:{ type: Schema.Types.ObjectId, ref: 'Status', default: '5b05f729800ebf2824292500' },
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: false},
    users_in: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }]
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


CommunitySchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Community', CommunitySchema);