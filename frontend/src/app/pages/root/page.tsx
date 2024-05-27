"use client";
import "@/style/my-drive.scss"
import {  getContentFromSubdir, getFoldersOnRootByUserId } from "@/services/RequestService";
import { useQuery } from "@tanstack/react-query";
import useFolderQueryEnabled from "@/hooks/useFolderQueryEnabled";
import FetchingDataLoading from "@/components/FetchingDataLoading";
import "@/style/contentContainer.scss"
import "@/style/my-drive.scss"
import { isTokenExpired } from "@/utils/UtilityFunctions";
import { useDispatch } from "react-redux";
import {  setTokenExpired } from "@/state/UserSlice";
import { toast } from "sonner";
import Items from "@/components/Items";
import useMyStore from "@/hooks/useMyStore";
import { useEffect, useRef, useState } from "react";
import IDirectory from "@/interfaces/IDirectory";
import IFile from "@/interfaces/IFile";


export default function MyDrivePage(){
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const [items, setItems] = useState<IDirectory[] | IFile[]>([]);
  const { user, folder } = useMyStore();
  const folderQueryEnabled = useFolderQueryEnabled(folder.currentFolder.id);
  const { data: rootFolders} = useQuery({
    queryKey:["rootFolders"],
    queryFn:async () => getFoldersOnRootByUserId(user.id, user.authToken).then((response) => {
      if(isTokenExpired(user.authToken)){
        toast.message("You will be logged out");
        dispatch(setTokenExpired(true));        
      }
      return response.data;
    },
  ),
    
  });

  const { data: contentResponse, isLoading:contentLoading } = useQuery({
    queryKey: ["contentResponse", folder.currentFolder.id, pageNumber],
    queryFn: async () => {
      const response = await getContentFromSubdir(folder.currentFolder.id, user.authToken, 50, pageNumber);
      if(isTokenExpired(user.authToken)){
        toast.message("You will be logged out");
        dispatch(setTokenExpired(true));        
      }
      return response.data; // Return the data from the API response
    },
    enabled: folderQueryEnabled,
  });

  
  useEffect(() => {
    setPageNumber(1); // Reset page number when folder changes
    setItems([]); // Reset items array when folder changes
  }, [folder.currentFolder.id]);
  
  useEffect(() => {
    if (contentResponse && contentResponse.files && contentResponse.directories) {
      // this would be required on infinite scroll
      // setItems(prevItems => [...prevItems, ...contentResponse.directories, ...contentResponse.files]);
      setItems([...contentResponse.directories, ...contentResponse.files]);
    }
  }, [contentResponse]);
  
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom) {
        console.log(pageNumber);
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  if (!folder.currentFolder.id) {
    return <Items items={rootFolders} />;
  }

  if (contentLoading) {
    return <FetchingDataLoading />;
  }

  return <Items items={items} />;
}
