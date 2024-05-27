"use client";
import { apiUrl } from "@/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";

export const AxiosRequest = async (
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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error("Something went wrong");
    } else {
      throw error;
    }
  }
};
