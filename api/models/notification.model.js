const { Schema, model, Types } = require('./mongo.connection')

const NotificationSchema = new Schema({
  notificationId:{ 
    type: Schema.Types.Number, 
    required: true, 
    unique: true,
    default: () => Date.now()
  },
  userId: { type: Schema.Types.Number },
  title: { type: Schema.Types.String },
  content: { type: Schema.Types.String },
  isViewed: { type: Schema.Types.Boolean, default: false },
}, { versionKey: false, timestamps: true });

const NotificationModel = model("notifications", NotificationSchema);

module.exports = NotificationModel
