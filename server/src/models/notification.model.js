import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Notification content is required"],
    },
  },
  { timestamps: true }
);

export const Notification = model("Notification", NotificationSchema);
