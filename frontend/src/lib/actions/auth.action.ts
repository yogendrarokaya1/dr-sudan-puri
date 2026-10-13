"use server";

import { authApi } from "@/lib/api/auth.api";
import {
  ILoginInput,
  ISignupInput,
  IUpdateProfileInput,
  IForgotPasswordInput,
  IResetPasswordInput,
} from "@/types";

export const loginAction = async (data: ILoginInput) => {
  try {
    const result = await authApi.login(data);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

export const signupAction = async (data: ISignupInput) => {
  try {
    const result = await authApi.signup(data);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Signup failed",
    };
  }
};

export const forgotPasswordAction = async (data: IForgotPasswordInput) => {
  try {
    await authApi.forgotPassword(data);
    return { success: true };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Request failed",
    };
  }
};

export const resetPasswordAction = async (data: IResetPasswordInput) => {
  try {
    await authApi.resetPassword(data);
    return { success: true };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Reset failed",
    };
  }
};

export const updateProfileAction = async (data: IUpdateProfileInput) => {
  try {
    const result = await authApi.updateProfile(data);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Update failed",
    };
  }
};