"use client";
import useContextMenu from "@/hooks/useContextMenu";
import IDirectory from "@/interfaces/IDirectory";
import IFile from "@/interfaces/IFile";
import { useAppSelector } from "@/lib/Store";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import ContextMenu from "./ContextMenu";
import { toast } from "sonner";
import {
  deleteDirectory,
  deleteFile,
  downloadFile,
} from "@/services/RequestService";
import {
  downloadFileFromClient,
  iconFromFileType,
} from "@/utils/UtilityFunctions";
import { fileIconHeight, fileIconWidth } from "@/constants";

function isFile(item: IFile | IDirectory): item is IFile {
  return (item as IFile).hasOwnProperty("fileSize"); // Assuming IFile has a name property
}

export default function Item({ item }: { item: IFile | IDirectory }) {
  const folderContextMenu = useContextMenu({
    position: { x: 0, y: 0 },
    toggled: false,
    selectedItem: null,
  });

  const fileContextMenu = useContextMenu({
    position: { x: 0, y: 0 },
    toggled: false,
    selectedItem: null,
  });

  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();

  // if we have a file
  if (isFile(item)) {
    return (
      <div>
        <ContextMenu
          isToggled={fileContextMenu.menuState.toggled}
          contextMenuRef={fileContextMenu.menuRef}
          positionX={fileContextMenu.menuState.position.x}
          positionY={fileContextMenu.menuState.position.y}
          rightClickItem={fileContextMenu.menuState.selectedItem}
          buttons={[
            {
              text: "Delete file",
              isSpacer: false,
              onClick: async () => {
                if (
                  fileContextMenu.menuState.selectedItem?.canDelete !== false
                ) {
                  const res = await deleteFile(
                    fileContextMenu.menuState.selectedItem.id,
                    user.authToken,
                  );
                  if (res.status === 200) {
                    toast.message("File was deleted!");
                    queryClient.invalidateQueries({
                      queryKey: ["contentResponse"],
                    });
                    fileContextMenu.resetContextMenu();
                  }
                } else {
                  toast.error("You cannot delete the file!");
                }
              },
            },
            {
              text: "Details",
              isSpacer: false,
              onClick: () => {
                alert(
                  "maybe show a context menu consisting of details about the folder",
                );
                fileContextMenu.resetContextMenu();
              },
            },
            {
              text: "Move",
              isSpacer: false,
              onClick: () =>
                alert(
                  "send a request of moving to a folder path, and then refetch that exact folder or something",
                ),
            },
            {
              text: "Share with",
              isSpacer: false,
              onClick: () =>
                alert(
                  "send a request of share with user and then refetch this folder",
                ),
            },
            {
              text: "Download",
              isSpacer: false,
              onClick: async () => {
                const response = await downloadFile(
                  fileContextMenu.menuState.selectedItem.id,
                  user.authToken,
                );
                const { data, fileName } = response.data;
                downloadFileFromClient(data, fileName);
                fileContextMenu.resetContextMenu();
              },
            },
          ]}
        />
        <li
          onContextMenu={(e) => fileContextMenu.handleContextMenu(e, item)}
          className={`list-item`}
        >
          {/* <ImagePreview file={file} /> */}
          <div className="file-details-container">
            <Image
              className="icon"
              src={iconFromFileType(item.fileType)}
              width={fileIconWidth}
              height={fileIconHeight}
              alt="item"
            />
            <div className="file-name">
              {/* <p>File name</p> */}
              <p>{item.name}</p>
            </div>
            {/* <hr className="delimiter"></hr>
                    <div className="file-details">
                        <p>Extension</p>
                        <p>{extensionFromEnum(file.fileType)}</p>
                    </div>
                    <span className="delimiter"/>
                    <div className="file-details">
                        <p>File size</p>
                        <p>{numberToMegaBytes(file.fileSize)+" MB"}</p>
                    </div>
                    <span className="delimiter"/>
                    <div className="file-details">
                        <p>Date uploaded</p>
                        <p>{formatDate(file.dateCreated.toString())}</p>
                    </div> */}
          </div>
        </li>
      </div>
    );
  }

  return (
    <div>
      <ContextMenu
        isToggled={folderContextMenu.menuState.toggled}
        contextMenuRef={folderContextMenu.menuRef}
        positionX={folderContextMenu.menuState.position.x}
        positionY={folderContextMenu.menuState.position.y}
        rightClickItem={folderContextMenu.menuState.selectedItem}
        buttons={[
          {
            text: "Delete folder",
            isSpacer: false,
            onClick: async () => {
              if (
                folderContextMenu.menuState.selectedItem?.canDelete !== false
              ) {
                const res = await deleteDirectory(
                  folderContextMenu.menuState.selectedItem.id,
                  user.authToken,
                );
                if (res.status === 200) {
                  toast.message("Directory was deleted!");
                  queryClient.invalidateQueries({
                    queryKey: ["contentResponse"],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ["rootFolders"],
                  });
                  folderContextMenu.resetContextMenu();
                }
              } else {
                toast.error("You cannot delete the folder!");
              }
            },
          },
          {
            text: "Move",
            isSpacer: false,
            onClick: () =>
              alert(
                "send a request of moving to a folder path, and then refetch that exact folder or something",
              ),
          },
          {
            text: "Share with",
            isSpacer: false,
            onClick: () =>
              alert(
                "send a request of share with user and then refetch this folder",
              ),
          },
        ]}
      />
      <li
        onContextMenu={(e) => folderContextMenu.handleContextMenu(e, item)}
        className={`list-item `}
        onClick={() => folderContextMenu.handleClick(item)}
      >
        <Image
          className="icon"
          src="/folder.svg"
          width={fileIconWidth}
          height={fileIconHeight}
          alt="item"
        />
        <p className="folder-name">{item.name}</p>
      </li>
    </div>
  );
}
