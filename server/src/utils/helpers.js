import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

export const getPaginatedData = async ({
  model,
  page = 1,
  limit = 10,
  query = {},
  populate = "",
  select = "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry -passCode",
  sort = { createdAt: -1 },
}) => {
  const options = {
    select,
    sort,
    page,
    limit,
    populate,
    lean: true,
    customLabels: {
      totalDocs: "totalItems",
      docs: "data",
      limit: "perPage",
      page: "currentPage",
      meta: "pagination",
    },
  };

  const { data, pagination } = await model.paginate(query, options);
  delete pagination?.pagingCounter;

  return { data, pagination };
};

export const getPaginatedUsers = async ({ query, page, limit, sort }) => {
  const { data, pagination } = await getPaginatedData({
    model: User,
    query: { ...query },
    page,
    limit,
    sort,
  });

  return { data, pagination };
};

export const getPaginatedProjects = async ({ query, page, limit, sort }) => {
  const populate = [
    {
      path: "admin",
      model: User,
      select: "_id fullName username avatar",
    },
    {
      path: "members.user",
      model: User,
      select: "_id fullName username avatar",
    },
  ];
  const { data, pagination } = await getPaginatedData({
    model: Project,
    query: { ...query },
    page,
    limit,
    sort,
    populate,
  });

  return { data, pagination };
};
