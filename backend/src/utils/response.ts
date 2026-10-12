import { Response } from "express";
import { IApiResponse, IPaginatedResponse } from "../types";

export const sendSuccess = <T>(
  res: Response,
  message: string = "Success",
  data: T,
  statusCode: number = 200
): Response<IApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string = "Something went wrong",
  statusCode: number = 500
): Response<IApiResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const sendPaginated = <T>(
  res: Response,
  message: string = "Success",
  data: T[],
  total: number,
  page: number,
  limit: number
): Response<IPaginatedResponse<T>> => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};