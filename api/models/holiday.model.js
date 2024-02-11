const { Schema, model, Types } = require('./mongo.connection')

const HolidaySchema = new Schema({
  holidayId:{ 
    type: Schema.Types.Number, 
    required: true, 
    unique: true,
    default: () => Date.now()
  },
  name: { type: Schema.Types.String },
}, { versionKey: false, timestamps: true });

const HolidayModel = model("holidays", HolidaySchema);

module.exports = HolidayModel
