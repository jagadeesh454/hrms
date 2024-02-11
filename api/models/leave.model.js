const { Schema, model, Types } = require('./mongo.connection')

const LeaveSchema = new Schema({
  leaveId:{ 
    type: Schema.Types.Number, 
    required: true, 
    unique: true,
    default: () => Date.now()
  },
  leaveType: { type: Schema.Types.String },
  fromDate: { type: Schema.Types.Date },
  toDate: { type: Schema.Types.Date },
  daysCount: { type: Schema.Types.Number },
  reason: { type: Schema.Types.String },
  employeeId: { type: Schema.Types.Number },
  appliedByEmployeeId: { type: Schema.Types.Number },
  appliedOn: { type: Schema.Types.Date, default: Date.now },
  leaveStatus: { type: Schema.Types.String, enum: ['DRAFT', 'APPROVED', 'REJECTED'], default: 'DRAFT' },
}, { versionKey: false, timestamps: true });

const LeaveModel = model("leaves", LeaveSchema);

module.exports = LeaveModel
