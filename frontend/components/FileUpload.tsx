import UploadedFile from "@/interfaces/UploadedFile";
import {
  formatDate,
  numberToMegaBytes,
  removeFileExtension,
} from "@/utils/UtilityFunctions";

export default function FileUpload({ file: fileArr }: { file: UploadedFile }) {
  return (
    <li
      className={`list-item ${fileArr.isUploaded === true ? "uploaded" : "pending-upload"}`}
    >
      <div className="file-details-container">
        <p className="file-name">{fileArr.file.name}</p>
        <hr className="delimiter"></hr>
        <p className="file-details">{fileArr.file.type}</p>
        <span className="delimiter" />
        <p className="file-details">
          {numberToMegaBytes(fileArr.file.size) + " MB"}
        </p>
        <span className="delimiter" />
        <p className="file-details">
          {fileArr.isUploaded === true ? "uploaded" : "pending upload"}
        </p>
      </div>
    </li>
  );
}
