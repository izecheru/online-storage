"use client";
import useSingleFile from "@/hooks/useSingleFile";
import Image from "next/image";
import "@/style/settings.scss"

export default function SettingsPage(){
    const {file, handleFile, imageUrl} = useSingleFile();
    
    return (
        <div className="settings-page">
            <h1>Want to change your profile picture?</h1>
            <input className="file-input" type="file" id="fileInput"
             onChange={(e)=>handleFile(e)}/>
            <div className="label-container">
                <label className="file-label" htmlFor="fileInput">Choose a picture</label>
            </div>

            {file && 
                <>
                    <Image src={imageUrl} alt="image" width={300} height={300}/>
                    <p>{file.name}</p>
                </>
            }
        </div>
    )
}