// Those are the fields that represent a file in my application
interface IFile {
  id: string; // id of the file
  canMove: boolean; // can move it?
  canDelete: boolean; // can be deleted?
  fileSize: number; // size of it
  dateModified: Date; //
  dateCreated: Date; //
  sharedWithOwnerIDs: string[]; // ids of the users this file is shared with
  name: string; // file name
  fileType: number; // file extension (.pdf, .png, etc.)
  data: string; // base64 representation of file data
  directoryId: string; // id of the parent directory
}
export default IFile;
