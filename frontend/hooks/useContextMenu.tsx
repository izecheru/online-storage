"use client";
import IDirectory from "@/interfaces/IDirectory";
import IFile from "@/interfaces/IFile";
import { addElement, setCurrentFolder } from "@/state/FolderSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type SelectedItem = IFile | IDirectory;

function isFile(item: SelectedItem): item is IFile {
  return (item as IFile).fileType !== undefined;
}

function useContextMenu(initialState: any) {
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(initialState);
  const menuRef = useRef<HTMLDivElement>(null);

  const resetContextMenu = () => {
    setMenuState({ ...menuState, toggled: false });
  };

  const handleContextMenu = (e: any, selectedItem: SelectedItem) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setMenuState({
      ...menuState,
      position: { x: clientX, y: clientY },
      toggled: true,
      selectedItem: selectedItem,
    });
  };

  const handleClickOutside = (e: any) => {
    if (menuRef.current === null) {
      return null;
    } else {
      if (!menuRef.current.contains(e.target)) {
        setMenuState({ ...menuState, toggled: false });
      }
    }
  };

  const handleClick = async (selectedItem: SelectedItem) => {
    if (!isFile(selectedItem)) {
      const myFolder = {
        id: selectedItem.id,
        name: selectedItem.name,
        parentId: selectedItem.parentId,
        canMove: false, // Default value
        canDelete: false, // Default value
        size: 0, // Default value
        dateModified: new Date(), // Default value
        sharedWithOwnerIds: [], // Default value
        dateCreated: new Date(), // Default value
        userId: "",
      };
      dispatch(setCurrentFolder(myFolder));
      dispatch(addElement(myFolder));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    menuState,
    menuRef,
    handleContextMenu,
    handleClick,
    resetContextMenu,
  };
}

export default useContextMenu;
