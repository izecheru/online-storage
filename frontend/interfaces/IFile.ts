interface IFile {
  id: string;
  canMove: boolean;
  canDelete: boolean;
  fileSize: number;
  dateModified: Date;
  dateCreated: Date;
  sharedWithOwnerIDs: string[];
  name: string;
  fileType: number;
  data: string;
  directoryId: string;
}

export default IFile;
