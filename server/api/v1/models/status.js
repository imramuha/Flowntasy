const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new mongoose.Schema(
  {
    status: { 
        type: String, 
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

StatusSchema.virtual('id').get(() => this._id );/*
RoleSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: '_status',
  justOne: false
});
*/
module.exports = mongoose.model('Status', StatusSchema);