import api from "./middleware";

export const getAllProjects = async ({
  page,
  limit,
  search,
  filter,
}: {
  page: number;
  limit: number;
  search: string;
  filter: string;
}) => {
  try {
    const { data } = await api.get(
      `/project?limit=${limit || 15}&page=${page || 1}&search=${
        search || ""
      }&filter=${filter || "atoz"}`
    );
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getMyProjects = async ({
  page,
  limit,
  search,
  filter,
}: {
  page: number;
  limit: number;
  search: string;
  filter: string;
}) => {
  try {
    const { data } = await api.get(
      `/project/my-projects?limit=${limit || 15}&page=${page || 1}&search=${
        search || ""
      }&filter=${filter || "atoz"}`
    );
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getProject = async (id: string) => {
  try {
    const { data } = await api.get(`/project/single/${id}`);
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const addMembers = async ({
  id,
  users,
}: {
  id: string;
  users: string[];
}) => {
  try {
    const { data } = await api.put(`/project/add-member/${id}`, {
      users,
    });
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const verifyMember = async ({
  id,
  passCode,
}: {
  id: string;
  passCode: string;
}) => {
  try {
    const { data } = await api.put(`/project/add-member/${id}`, {
      passCode,
    });
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
