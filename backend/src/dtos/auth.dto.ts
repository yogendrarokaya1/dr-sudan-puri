import { BloodGroup, Gender } from "../types";

export interface SignupDTO {
  name: string;
  email: string;
  password: string;

  // Optional on signup — can be filled later in profile
  phone?: string;
  country?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  bloodGroup?: BloodGroup;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export interface UpdateProfileDTO {
  name?: string;
  phone?: string;
  country?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  medicalHistory?: string;
  profileImage?: string;
}