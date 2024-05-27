"use client";
import IFile from "@/interfaces/IFile";
import { useAppSelector } from "@/lib/Store";
import { getDataFromFileId } from "@/services/RequestService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useImagePreviewMenu(file: IFile) {
  const [fileData, setFileData] = useState<string>("");
  const user = useAppSelector((state) => state.user);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [file.id],
    queryFn: async () => {
      try {
        const response = await getDataFromFileId(file.id, user.authToken);
        setFileData(response.data); // Update fileData state
        return response.data; // Return the data fetched from the API
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to propagate it to React Query
      }
    },
  });

  return { fileData, isLoading, isError, refetch };
}

export default useImagePreviewMenu;
