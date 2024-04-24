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
    const { data } = await api.put(`/project/add-members/${id}`, {
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
    const { data } = await api.put(`/project/verify-member/${id}`, {
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

export const createProject = async ({
  name,
  desc,
  content,
  passCode,
}: {
  name: string;
  desc: string;
  content: string;
  passCode: string;
}) => {
  try {
    const { data } = await api.post(`/project/create`, {
      name,
      desc,
      content,
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

export const createBranch = async ({
  id,
  content,
}: {
  content: string;
  id: string;
}) => {
  try {
    const { data } = await api.post(`/project/create-branch/${id}`, {
      content,
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

export const getBranches = async (id: string) => {
  try {
    const { data } = await api.get(`/project/all-branches/${id}`);
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

export const rollBack = async ({
  id,
  branchId,
}: {
  id: string;
  branchId: string;
}) => {
  try {
    const { data } = await api.put(`/project/rollback-branch/${id}`, {
      branchId,
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
