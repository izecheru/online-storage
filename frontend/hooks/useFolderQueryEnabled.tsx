"use client";
import { useMemo } from "react";

function useFolderQueryEnabled(folderId: string) {
  return useMemo(() => {
    return folderId !== "" && folderId !== undefined;
  }, [folderId]);
}

export default useFolderQueryEnabled;
