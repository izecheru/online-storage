"use client";
import { useAppSelector } from "@/lib/Store";
import { removeLastElement, setLastVisitedFolder } from "@/state/FolderSlice";
import "@/style/topactions.scss";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const TopActions = () => {
  const router = useRouter();
  const path = usePathname();
  const [hide, setHide] = useState<boolean>(false);
  const folder = useAppSelector((state) => state.folder);
  const dispatch = useDispatch();
  const goBack = () => {
    if (
      path === "/pages/root/uploadFile" ||
      path === "/pages/root/createFolder"
    ) {
      router.back();
    } else {
      if (folder.navigatedFolders.length === 0) {
        toast.message("Can't go back, enter a folder first!");
        return;
      }
      dispatch(removeLastElement());
      dispatch(setLastVisitedFolder());
    }
  };

  const handleCreateFolder = () => {
    router.push("/pages/root/createFolder");
  };

  const handleUploadFile = () => {
    if (!folder.currentFolder.id) {
      toast.message(
        "Cannot create Files on root! Click on a folder and then try to upload a file!"
      );
      return;
    }
    router.push("/pages/root/uploadFile");
  };

  useEffect(() => {
    const pagesToHideOn = ["shared-with-me", "contact", "settings"];
    if (
      path.includes(pagesToHideOn[0]) ||
      path.includes(pagesToHideOn[1]) ||
      path.includes(pagesToHideOn[2])
    ) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [path]);

  return (
    <div className="top-actions">
      <div className={`button-container ${hide ? "hide" : ""}`}>
        <button onClick={goBack} className="global-button">
          Go back
        </button>
        <button onClick={handleCreateFolder} className={`global-button`}>
          Create folder
        </button>
        <button onClick={handleUploadFile} className={`global-button`}>
          Upload file
        </button>
      </div>
    </div>
  );
};

export default TopActions;
