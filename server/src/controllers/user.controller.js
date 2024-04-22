import { User } from "../models/user.model.js";
import { uploadFile } from "../utils/fileUpload.js";
import { getPaginatedUsers } from "../utils/helpers.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );
    if (!user) return next("Unauthorized Access");

    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const users = await getPaginatedUsers({
      query: { username: { $regex: `^${search}`, $options: "i" } },
      page,
      limit,
      sort: { username: sortDirection },
    });

    return res.status(200).json({
      success: true,
      message: "All users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { country, fullName, phone, bio, email, username } = req.body;

    if (username || email) {
      const userExists = await User.findOne({
        _id: { $ne: req.user._id },
        $or: [{ username }, { email }],
      });
      if (userExists) {
        return userExists.username === username
          ? next("Username already exists")
          : next("Email already in use");
      }
    }

    let avatar = null;
    if (req.file) {
      const avatarLocalPath = req.file?.path;
      avatar = await uploadFile(avatarLocalPath);
    }

    const fields = {
      country,
      phone,
      bio,
      email,
      username,
      fullName,
    };

    if (avatar) {
      fields.avatar = {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user._id, fields, {
      new: true,
    }).select(
      "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );

    return res.status(200).json({
      success: true,
      message: "Profile Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
