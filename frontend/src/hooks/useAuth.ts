"use client";

import { useAuthContext } from "@/context/AuthContext";
import { authApi } from "@/lib/api/auth.api";
import { setToken } from "@/lib/utils/cookie";
import { ILoginInput, ISignupInput, IUpdateProfileInput } from "@/types";
import { useState } from "react";

export const useAuth = () => {
  const { user, token, isLoading, isAuthenticated, login, logout, refreshProfile } =
    useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: ILoginInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await authApi.login(data);
      login(result);
      return { success: true };
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const message = e.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (data: ISignupInput) => {
  setIsSubmitting(true);
  setError(null);
  try {
    await authApi.signup(data);
    return { success: true };
  } catch (err: unknown) {
    const e = err as { response?: { data?: { message?: string } } };
    const message = e.response?.data?.message || "Signup failed";
    setError(message);
    return { success: false, message };
  } finally {
    setIsSubmitting(false);
  }
};

  const handleUpdateProfile = async (data: IUpdateProfileInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await authApi.updateProfile(data);
      await refreshProfile();
      return { success: true, data: result };
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const message = e.response?.data?.message || "Update failed";
      setError(message);
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isSubmitting,
    error,
    handleLogin,
    handleSignup,
    handleUpdateProfile,
    logout,
    refreshProfile,
  };
};