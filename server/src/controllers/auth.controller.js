import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendVerificationMail } from "../utils/mailer.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName, role } = req.body;
    if (password.includes(" "))
      return next("Password must not contain any white spaces");

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      return userExists.username === username
        ? next("Username already exists")
        : next("Email already in use");
    }

    const user = await User.create({
      username,
      email,
      password,
      fullName,
      role,
    });
    if (!user) return next("Failed to create an account");

    const userData = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    // user.password = undefined

    return res.status(201).json({
      success: true,
      message: "Account created",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate tokens");
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) return next("Username is required");
    if (!password) return next("Password is required");

    const userData = await User.findOne({ username });
    if (!userData) return next("Invalid credentials");

    const isPassCorrect = await userData.comparePassword(password);
    if (!isPassCorrect) return next("Invalid credentials");

    const { accessToken, refreshToken } = await generateTokens(userData._id);

    const user = await User.findById(userData._id).select(
      "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login success",
        data: { user, accessToken, refreshToken },
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // Find user and reset the refreshToken in db
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logged out successfully",
        data: {},
      });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return next("Unauthorized Access");

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id);
    if (!user) return next("Invalid Token");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        data: { accessToken, refreshToken },
      });
  } catch (error) {
    next(error);
  }
};

export const sendForgotLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next("Email is required");

    const user = await User.findOne({ email });
    if (!user) return next("No account exists for this email");

    await sendVerificationMail({
      email,
      type: "RESET",
      userId: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Email has been sent",
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return next("Invalid token");

    user.password = newPassword;
    user.forgotPasswordToken = "";
    user.forgotPasswordTokenExpiry = "";
    await user.save({ validateBeforeSave: false });

    return res.status(201).json({
      success: true,
      message: "Password updated",
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const sendVerificationEmail = async (req, res, next) => {
  try {
    await sendVerificationMail({
      email: req.user.email,
      type: "VERIFY",
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Verification email has been sent",
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next("User not found");

    user.isEmailVerified = true;
    user.verifyToken = "";
    user.verifyTokenExpiry = "";

    await user.save({ validateBeforeSave: false });
    return res.status(200).json({
      success: true,
      message: "Email Verified",
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const registerBulkUser = async (req, res, next) => {
  try {
    const users = [
      {
        username: "aliahmed",
        email: "ali.ahmed@example.com",
        password: "Abc12345%",
        fullName: "Ali Ahmed",
        role: "member",
      },
      {
        username: "fatimakhan",
        email: "fatima.khan@example.com",
        password: "Abc12345%",
        fullName: "Fatima Khan",
        role: "member",
      },
      {
        username: "mehranraza",
        email: "mehran.raza@example.com",
        password: "@Abc12345%",
        fullName: "Mehran Raza",
        role: "member",
      },
      {
        username: "zainabiqbal",
        email: "zainab.iqbal@example.com",
        password: "Abc12345%",
        fullName: "Zainab Iqbal",
        role: "member",
      },
      {
        username: "hassannawaz",
        email: "hassan.nawaz@example.com",
        password: "Abc12345%",
        fullName: "Hassan Nawaz",
        role: "member",
      },
      {
        username: "sanaahmed",
        email: "sana.ahmed@example.com",
        password: "Abc12345%",
        fullName: "Sana Ahmed",
        role: "member",
      },
      {
        username: "umairkhilji",
        email: "umair.khilji@example.com",
        password: "Abc12345%",
        fullName: "Umair Khilji",
        role: "member",
      },
      {
        username: "aizaahmed",
        email: "aiza.ahmed@example.com",
        password: "Abc12345%",
        fullName: "Aiza Ahmed",
        role: "member",
      },
      {
        username: "haiderali",
        email: "haider.ali@example.com",
        password: "Abc12345%",
        fullName: "Haider Ali",
        role: "member",
      },
      {
        username: "manahilraza",
        email: "manahil.raza@example.com",
        password: "Abc12345%",
        fullName: "Manahil Raza",
        role: "member",
      },
      {
        username: "saadkhan",
        email: "saad.khan@example.com",
        password: "Abc12345%",
        fullName: "Saad Khan",
        role: "member",
      },
      {
        username: "ammarajmal",
        email: "ammar.ajmal@example.com",
        password: "Abc12345%",
        fullName: "Ammar Ajmal",
        role: "member",
      },
      {
        username: "afshangul",
        email: "afshan.gul@example.com",
        password: "Abc12345%",
        fullName: "Afshan Gul",
        role: "member",
      },
      {
        username: "danishraza",
        email: "danish.raza@example.com",
        password: "Abc12345%",
        fullName: "Danish Raza",
        role: "member",
      },
      {
        username: "salihanawaz",
        email: "salih.anawaz@example.com",
        password: "Abc12345%",
        fullName: "Salih Anawaz",
        role: "member",
      },
    ];

    for (const user of users) {
      await User.create({
        username: user.username,
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        role: user.role,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Accounts created",
      data: "",
    });
  } catch (error) {
    next(error);
  }
};
