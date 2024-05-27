"use client";
import "@/style/createfolder.scss"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createDirectory } from "@/services/RequestService";
import { toast } from "sonner";
import useMyStore from "@/hooks/useMyStore";

export default function CreateFolderPage(){
    const [folderName, setFolderName] = useState<string>('');
    const router = useRouter();
    const {user, folder} = useMyStore();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(folderName===''){
            toast.error("Name must be at least 1 character long!");
            return;
        }
        let data = {
            "parentId": folder.currentFolder.id===''?null:folder.currentFolder.id,
            "canMove": true,
            "canDelete": true,
            "name": folderName,
            "userId": user.id
        }
        
        const res = await createDirectory(JSON.stringify(data), user.authToken);
        if (res.status === 200) {
            toast.message("Directory was created!");
            router.back();
          } 
    }
    return (
        <div className="create-folder-body">
            <form className="create-folder-form" onSubmit={handleSubmit}>
                <input className="input-field" placeholder="Folder name" onChange={(e)=>setFolderName(e.target.value)}></input>
                <button type="submit" className="create-folder-button">Create folder</button>
            </form>
        </div>
    );
}