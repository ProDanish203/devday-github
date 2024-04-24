import { Notification } from "../models/notification.model.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { STATUS } from "../utils/constants.js";
import { getPaginatedProjects } from "../utils/helpers.js";
import { sendPasscodeMail } from "../utils/mailer.js";

export const createProject = async (req, res, next) => {
  try {
    const { name, desc, content, passCode } = req.body;
    if (req.user.role !== "admin")
      return next("You are not authorized to perfrom this action");
    if (!name) return next("Project name is required");
    if (!desc) return next("Project description is required");
    if (!content) return next("Project content is required");
    if (!passCode) return next("Project passcode is required");
    if (passCode.length !== 6)
      return next("Passcode must be 6 exactly characters");

    const project = await Project.create({
      admin: req.user._id,
      name,
      desc,
      content,
      passCode,
    });

    if (!project) return next("An error occured while creating the project");
    // Send notifications
    await Notification.create({
      from: req.user._id,
      to: req.user._id,
      content: `New Project: ${name} has been created.`,
    });

    // Update user hasNotification field
    await User.findByIdAndUpdate(
      req.user._id,
      {
        hasNotifications: true,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Project created",
      data: project,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const projects = await getPaginatedProjects({
      query: {
        name: { $regex: `^${search}`, $options: "i" },
        $or: [{ parentId: null }, { parentId: { $exists: false } }],
      },
      page,
      limit,
      sort: { name: sortDirection },
    });

    return res.status(200).json({
      success: true,
      message: "All projects",
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMyProjects = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const projects = await getPaginatedProjects({
      query: {
        $and: [
          {
            $or: [
              { admin: req.user._id },
              {
                members: {
                  $elemMatch: { user: req.user._id },
                },
              },
            ],
          },
          {
            $or: [{ parentId: null }, { parentId: { $exists: false } }],
          },
        ],
        name: { $regex: `^${search}`, $options: "i" },
      },
      page,
      limit,
      sort: { name: sortDirection },
    });

    return res.status(200).json({
      success: true,
      message: "My projects",
      data: projects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate({
        path: "admin",
        model: User,
        select: "_id fullName username avatar",
      })
      .populate({
        path: "members.user",
        model: User,
        select: "_id fullName username avatar",
      });

    const childrenCount = await Project.countDocuments({ parent: id });
    project.childrenCount = childrenCount;

    return res.status(200).json({
      success: true,
      message: "Project fecthed",
      data: project,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { users } = req.body;
    if (users.length === 0) return next("Atleast 1 user is required");

    const project = await Project.findById(id);
    if (!project) return next("No such project found");

    // Filter out users who are already members of the project
    const newUsers = users.filter(
      (userId) => !project.members.some((member) => member.user.equals(userId))
    );
    if (newUsers.length === 0)
      return next("All provided users are already members of the project");

    // Update the members field in project
    const membersToAdd = newUsers.map((userId) => ({
      user: userId,
      status: STATUS.PENDING,
    }));
    project.members.push(...membersToAdd);

    await project.save();

    // Send Email to users with passcode
    const emailPromises = newUsers.map(async (userId) => {
      const user = await User.findById(userId).select("email");
      await sendPasscodeMail({
        email: user.email,
        projectName: project.name,
        passCode: project.passCode,
      });
    });
    await Promise.all(emailPromises);

    // Send Notification To User
    const notificationPromises = newUsers.map(async (userId) => {
      const user = await User.findById(userId);
      await Notification.create({
        from: req.user._id,
        to: user._id,
        content: `You have been added to ${project.name}. Confirm your login by the passcode provided to you on your email`,
      });
      // Update user hasNotification field
      await User.findByIdAndUpdate(userId, { hasNotifications: true });
    });
    await Promise.all(notificationPromises);

    return res.status(200).json({
      success: true,
      message: "Member added",
      data: project,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { passCode } = req.body;
    const memberId = req.user._id;

    if (req.user.role === "admin")
      return next("You are not authorized to perform this action");

    const project = await Project.findById(id);
    if (!project) return next("No such project found");

    if (passCode != project.passCode) return next("Invalid passcode");

    const memberToUpdate = project.members.find((member) =>
      member.user.equals(memberId)
    );
    if (!memberToUpdate) return next("Member not found");

    // Update the member's status from "pending" to "member"
    if (memberToUpdate.status === STATUS.PENDING) {
      memberToUpdate.status = STATUS.MEMBER;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Member status updated",
      data: project,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createNewBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) return next("Project content is required");

    const project = await Project.findById(id);
    if (!project) return next("No project found");

    const isAuthorized =
      project.admin.toString() === req.user._id.toString() ||
      project.members.some(
        (member) =>
          member.user.toString() === req.user._id.toString() &&
          member.status !== "pending"
      );

    if (!isAuthorized)
      return next("You are not authorized to perform this action");

    const newProject = await Project.create({
      content,
      name: project.name,
      desc: project.desc,
      passCode: project.passCode,
      admin: project.admin,
      members: project.members,
      parentId: project._id,
    });
    if (!newProject) return next("An error occured while updating the project");

    // Update the parent project
    project.children.push({
      branch: newProject._id,
      by: req.user._id,
    });
    await project.save();

    // Notify the admin
    await Notification.create({
      from: req.user._id,
      to: project.admin,
      content: `A new branch has been created by: @${req.user.username} in ${project.name}.`,
    });

    // Update user hasNotification field
    await User.findByIdAndUpdate(
      project.admin,
      {
        hasNotifications: true,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "New branch created",
      data: newProject,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllBranches = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branches = await Project.findById(id)
      .populate({
        path: "children.by",
        model: User,
        select: "_id fullName username avatar",
      })
      .populate({
        path: "children.branch",
        model: Project,
        select: "_id createdAt",
      })
      .populate({
        path: "admin",
        model: User,
        select: "_id fullName username avatar",
      })
      .select("-members -tasks -passCode -content")
      .lean();

    return res.status(200).json({
      success: true,
      message: "My projects",
      data: branches,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createBackup = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const rollbackTo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { branchId } = req.body;
    const project = await Project.findById(id);
    const branch = await Project.findById(branchId);
    if (!project) return next("No project found");
    if (!branch) return next("No branch found");

    branch.parentId = null;
    await branch.save();

    project.parentId = branch._id;
    await project.save();

    // Notify the admin
    await Notification.create({
      from: req.user._id,
      to: project.admin,
      content: `A rollover has been performed by: @${req.user.username} in ${project.name}.`,
    });

    // Update user hasNotification field
    await User.findByIdAndUpdate(
      project.admin,
      {
        hasNotifications: true,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rollback success",
      data: branch,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
