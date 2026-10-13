export type UserRole = "admin" | "user";
export type Gender = "male" | "female" | "other" | "prefer-not-to-say";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  phone?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  medicalHistory?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignupInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
}

export interface IUpdateProfileInput {
  name?: string;
  phone?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  medicalHistory?: string;
  profileImage?: string;
}

export interface IForgotPasswordInput {
  email: string;
}

export interface IResetPasswordInput {
  token: string;
  newPassword: string;
}