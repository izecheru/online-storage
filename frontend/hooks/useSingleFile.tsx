"use client";
import { useState } from "react";

export default function useSingleFile() {
  const [file, setFile] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string); // Store the image URL in state
      };
      reader.readAsDataURL(selectedFile); // Read the file as data URL
    }
  };

  return { file, handleFile, imageUrl };
}
