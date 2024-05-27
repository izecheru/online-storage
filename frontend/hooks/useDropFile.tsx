"use client";

import UploadedFile from "@/interfaces/UploadedFile";
import { useAppSelector } from "@/lib/Store";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function useDropFile() {
  const folder = useAppSelector((state) => state.folder);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const resetFileArray = () => {
    setFiles([]);
  };

  const handleDragEnter = (e:React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e:React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e:React.DragEvent) => {
    e.preventDefault();
    if (!folder.currentFolder.id) {
      toast.message(
        "Navigate to a folder first because the root does not support file uploads!",
      );
      return;
    }
    setIsDragging(false);

    const droppedFiles: File[] = Array.from(e.dataTransfer.files) as File[];

    const newFilesWithUploadStatus: UploadedFile[] = droppedFiles.map(
      (file) => ({
        file,
        isUploaded: false, // Initially set to false, assuming upload hasn't occurred yet
      }),
    );

    setFiles((prevFiles) => [...prevFiles, ...newFilesWithUploadStatus]);
  };

  return {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFiles,
    resetFileArray,
    setIsUploading,
    files,
    isDragging,
    isUploading,
  };
}
