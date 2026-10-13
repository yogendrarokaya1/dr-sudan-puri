"use server";

import { contactApi, IContactInput } from "@/lib/api/contact.api";

export const submitContactAction = async (data: IContactInput) => {
  try {
    const result = await contactApi.submit(data);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to send message",
    };
  }
};

export const getContactsAction = async () => {
  try {
    const result = await contactApi.getAll();
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch contacts",
    };
  }
};

export const markContactAsReadAction = async (id: string) => {
  try {
    const result = await contactApi.markAsRead(id);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to mark as read",
    };
  }
};