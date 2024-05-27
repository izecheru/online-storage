"use client";
import useImagePreviewMenu from "@/hooks/useImagePreview";
import IFile from "@/interfaces/IFile";
import { getDataFromFileId } from "@/services/RequestService";
import "@/style/imageonlist.scss";
import { getImageSizeAndResize } from "@/utils/UtilityFunctions";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImagePreview = ({ file }: { file: IFile }) => {
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // const handleImageLoad = (event:any) => {
  //     const { naturalWidth, naturalHeight } = event.target;
  //     setDimensions({ width: naturalWidth, height: naturalHeight });
  // };

  const myFile = useImagePreviewMenu(file);

  if (file.fileType! < 2 || file.fileType! > 4)
    return <p className="no-preview">No preview for this file type!</p>;

  return (
    <Image
      className="image-on-list"
      //onLoad={handleImageLoad}
      src={myFile.fileData}
      width={20}
      height={20}
      alt="image"
      decoding="async"
    />
  );
};

export default ImagePreview;
