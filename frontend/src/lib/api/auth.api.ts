import axiosInstance from "./axios";
import { ENDPOINTS } from "./endpoints";
import {
  IAuthResponse,
  ILoginInput,
  ISignupInput,
  IUpdateProfileInput,
  IForgotPasswordInput,
  IResetPasswordInput,
  IUser,
} from "@/types";

export const authApi = {
  signup: async (data: ISignupInput): Promise<IAuthResponse> => {
    const res = await axiosInstance.post(ENDPOINTS.AUTH.SIGNUP, data);
    return res.data.data;
  },

  login: async (data: ILoginInput): Promise<IAuthResponse> => {
    const res = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data);
    return res.data.data;
  },

  forgotPassword: async (data: IForgotPasswordInput): Promise<void> => {
    await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  resetPassword: async (data: IResetPasswordInput): Promise<void> => {
    await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },

  getProfile: async (): Promise<IUser> => {
    const res = await axiosInstance.get(ENDPOINTS.AUTH.PROFILE);
    return res.data.data;
  },

  updateProfile: async (data: IUpdateProfileInput): Promise<IUser> => {
    const res = await axiosInstance.patch(ENDPOINTS.AUTH.PROFILE, data);
    return res.data.data;
  },
};