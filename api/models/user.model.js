const { Schema, model, Types } = require('./mongo.connection')
const _ = require('lodash');

const UserSchema = new Schema({
  userId: {
    type: Schema.Types.Number,
    required: true,
    unique: true,
    default: () => Date.now()
  },
  name: { type: Schema.Types.String },
  access: { type: Schema.Types.String, enum: ['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN', 'EMPLOYEE'], default: 'EMPLOYEE' },
  role: { type: Schema.Types.String },
  employeeId: { type: Schema.Types.Number },
  emailId: { type: Schema.Types.String, unique: true, required: true },
  password: { type: Schema.Types.String, default: '12345' },
}, { versionKey: false, timestamps: true });

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
      return _.omit(ret, ['password']);
  }
});

const UserModel = model("users", UserSchema);

module.exports = UserModel
