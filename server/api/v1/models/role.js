const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new mongoose.Schema(
  {
    role: { type: String},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

RoleSchema.virtual('id').get(() => this._id );/*
RoleSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: '_role',
  justOne: false
});*/

module.exports = mongoose.model('Role', RoleSchema);