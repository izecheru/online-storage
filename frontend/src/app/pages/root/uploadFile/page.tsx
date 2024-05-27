"use client";
import "@/style/uploadmenu.scss"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/lib/Store";
import { createFile } from "@/services/RequestService";
import {  fileTypeFromEnum, readFileAsBase64, removeFileExtension } from "@/utils/UtilityFunctions";
import { toast } from "sonner";
import useDropFile from "@/hooks/useDropFile";
import FilesUploadList from "@/components/FilesUploadList";
import Image from "next/image";

export default function UploadFilePage(){
  const [count, setCount] = useState<number>(0);
  const user = useAppSelector((state)=>state.user);
  const fileDropZone = useDropFile();
  const router = useRouter();
  const folder = useAppSelector((state)=>state.folder);
  const uploadFiles = async () => {
    fileDropZone.setIsUploading(true);
    let myCount = 0;    
    for(let i =0 ;i<fileDropZone.files.length;i++){
      const file = fileDropZone.files[i].file;
      const isUploaded = fileDropZone.files[i].isUploaded;
      if(!isUploaded){
        try{
          const fileData = await readFileAsBase64(file);
          const mnemonic = fileData.split(',')[0];
          const base64Data = fileData.split(',')[1];
          const fileType = fileTypeFromEnum(file.name);
          const data = {
            directoryId: folder.currentFolder.id,
            canMove: "true",
            canDelete: "true",
            fileSize: file.size,
            name: removeFileExtension(file.name),
            fileType: fileType,
            data: base64Data,
            fileMnemonic: mnemonic
          };
          const res = await createFile(JSON.stringify(data),user.authToken);
          if(res.status===200){
            myCount++;
            setCount(myCount);
            // Mark the file as uploaded in the state
            const updatedFiles = [...fileDropZone.files];
            updatedFiles[i].isUploaded = true;
            fileDropZone.setFiles(updatedFiles);
          }
        }
        catch (err){
          console.log(err);
        }
      }
    }
    toast.message(`Files were uploaded succesfully!`);
    fileDropZone.setIsUploading(false);
  };

  return (
    <div className="file-upload">
      <div
        className={`file-drop-zone ${fileDropZone.isDragging ? 'dragging' : ''}`}
        onDragEnter={fileDropZone.handleDragEnter}
        onDragOver={fileDropZone.handleDragOver}
        onDragLeave={fileDropZone.handleDragLeave}
        onDrop={fileDropZone.handleDrop}
      >
        <p>Drag and drop files here</p>
      </div>
      <div className="upload-status">
        <div>
          {fileDropZone.isUploading === true ? (
            <div className="uploading-isLoading">
              <p>Files are being uploaded...   {((100*count)/fileDropZone.files.length).toFixed(0)}%   </p>
              <Image className="loading-icon" src='/loading.svg' width={40} height={40} alt="item"/>
            </div>
          ) : (
            <div className="uploading-isLoading">
              <p>Waiting for files!</p>
            </div>
          )}
        </div>
      </div>
      <button className="start-upload" onClick={uploadFiles}>Start to upload all available files!</button>
      <button className="erase-files" onClick={fileDropZone.resetFileArray}>Erase files from upload queue!</button>
      <div className="file-upload-container">
        <FilesUploadList files={fileDropZone.files} />
      </div>
    </div>
  );
}