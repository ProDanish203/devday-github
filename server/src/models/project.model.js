import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ROLES } from "../utils/constants.js";

const ProjectSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already taken"],
      trim: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [true, "Password must be greater than 6 charcters"],
    },
    isEmailVerfied: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.MEMBER,
    },
    country: String,
    phone: String,
    bio: String,
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
  },
  { timestamps: true }
);


ProjectSchema.plugin(mongoosePaginate);

export const Project = model("Project", ProjectSchema);
