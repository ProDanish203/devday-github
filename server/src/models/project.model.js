import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    files: [
      {
        type: String,
        required: [true, "File is required"],
      },
    ],
    desc: String,
  },
  { timestamps: true }
);

ProjectSchema.plugin(mongoosePaginate);

export const Project = model("Project", ProjectSchema);
