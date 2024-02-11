const { Schema, model, Types } = require('./mongo.connection')

const EmployeeSchema = new Schema({
  employeeId: { 
    type: Schema.Types.Number, 
    required: true, 
    unique: true,
    default: () => Date.now()
  },
  emailId: { type: Schema.Types.String, unique: true, required: true },
  fullName: { type: Schema.Types.String },
  gender: { type: Schema.Types.String, enum: ['male', 'female', 'other'] },
  dateOfBirth: {type: Schema.Types.Date },
  department: { type: Schema.Types.String },
  designation: { type: Schema.Types.String },
  address: {
    address1: { type: Schema.Types.String },
    address2: { type: Schema.Types.String },
    address3: { type: Schema.Types.String },
    address4: { type: Schema.Types.String },
    city: { type: Schema.Types.String },
    state: { type: Schema.Types.String },
    country: { type: Schema.Types.String },
  },
  education: {
    education1: { type: Schema.Types.String },
    education2: { type: Schema.Types.String },
    education3: { type: Schema.Types.String },
  },
  workExperience: {
    workExperience1: { type: Schema.Types.String },
    workExperience2: { type: Schema.Types.String },
    workExperience3: { type: Schema.Types.String },
  },
  bankDetails: {
    bankName: { type: Schema.Types.String },
    accountHolderName: { type: Schema.Types.String },
    accountNumber: { type: Schema.Types.String },
    IFSC: { type: Schema.Types.String },
    branchName: { type: Schema.Types.String },
  },
  salaryDetails: {
    salaryDetails1: { type: Schema.Types.String },
    salaryDetails2: { type: Schema.Types.String },
    salaryDetails3: { type: Schema.Types.String },
  },
}, { versionKey: false, timestamps: true });

EmployeeSchema.index({ fullName: 'text' });

const EmployeeModel = model('employees', EmployeeSchema)

module.exports = EmployeeModel;
