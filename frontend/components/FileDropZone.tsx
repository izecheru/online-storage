"use client";
import "@/style/filedropzone.scss";
import { useState } from "react";

const FileDropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
  };
  return (
    <div
      className={`file-drop-zone ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag and drop files here</p>
    </div>
  );
};

export default FileDropZone;
