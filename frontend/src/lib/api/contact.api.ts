import axiosInstance from "./axios";
import { ENDPOINTS } from "./endpoints";

export interface IContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const contactApi = {
  submit: async (data: IContactInput): Promise<IContact> => {
    const res = await axiosInstance.post(ENDPOINTS.CONTACT.BASE, data);
    return res.data.data;
  },

  getAll: async (): Promise<IContact[]> => {
    const res = await axiosInstance.get(ENDPOINTS.CONTACT.BASE);
    return res.data.data;
  },

  markAsRead: async (id: string): Promise<IContact> => {
    const res = await axiosInstance.patch(ENDPOINTS.CONTACT.BY_ID(id));
    return res.data.data;
  },
};