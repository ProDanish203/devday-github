import api from "./middleware";

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const { data } = await api.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
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

export const registerUser = async ({
  username,
  password,
  email,
  fullName,
}: {
  username: string;
  password: string;
  email: string;
  fullName: string;
}) => {
  try {
    const { data } = await api.post("/auth/register", {
      username,
      password,
      email,
      fullName,
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

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/user/current-user");

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

export const forgetPassword = async (email: string) => {
  try {
    const { data } = await api.post("/auth/forget-password", { email });

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    const { data } = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const sendVerifyLink = async () => {
  try {
    const { data } = await api.post("/auth/send-verification-email");

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const verifyEmail = async ({ token }: { token: string }) => {
  try {
    const { data } = await api.post("/auth/verify-email", {
      token,
    });

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateProfile = async (info: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.put("/user/admin-info", info);

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
