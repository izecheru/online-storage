"use client";
import { apiUrl } from "@/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";

export const AuthenticatedAxiosRequest = async (
  method: string,
  url: string,
  config: AxiosRequestConfig,
) => {
  try {
    const response: AxiosResponse = await axios.request({
      ...config,
      method,
      url: apiUrl + url,
    });
    return response;
  } catch (error: any) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      throw new Error("Token has expired!");
    } else {
      throw error;
    }
  }
};
