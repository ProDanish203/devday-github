import api from "./middleware";

export const getUsers = async ({
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
      `/user?limit=${limit || 15}&page=${page || 1}&search=${
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
