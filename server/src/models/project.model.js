import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { STATUS } from "../utils/constants.js";

const ProjectSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Project name is required"],
    },
    content: {
      type: String,
      required: [true, "Some content is required"],
    },
    desc: {
      type: String,
      required: [true, "Project description is required"],
    },
    passCode: {
      type: Number,
      required: [true, "Project passcode is required"],
      minlength: [true, "Passcode must be 6 digits"],
      maxlength: [true, "Passcode must be 6 digits"],
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: Object.values(STATUS),
          default: STATUS.PENDING,
        },
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    children: [
      {
        branch: {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
        by: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

ProjectSchema.plugin(mongoosePaginate);
ProjectSchema.plugin(aggregatePaginate);

export const Project = model("Project", ProjectSchema);
