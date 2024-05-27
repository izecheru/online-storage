import UploadedFile from "@/interfaces/UploadedFile";
import FileUpload from "./FileUpload";

export default function FilesUploadList({ files }: { files: UploadedFile[] }) {
  return (
    <div>
      {files &&
        files.map((file: UploadedFile, index: number) => (
          <div className="files-wrapper" key={index}>
            <ul className="unordered-list">
              <FileUpload file={file} />
            </ul>
          </div>
        ))}
    </div>
  );
}
