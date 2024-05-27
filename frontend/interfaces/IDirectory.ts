import IFile from "./IFile";

// Those are the fields that represent a file in my application
export default interface IDirectory {
  // id of the directory
  id: string;

  // is the directory on root or not?
  parentId?: string;

  // can move directory?
  canMove: boolean;

  // can delete directory?
  canDelete: boolean;

  // size of directory (sum of all file sizes)
  size?: number;

  dateModified?: Date; //

  // ids of the users this directory is shared it(
  // if it is shared, all containing files are too)
  sharedWithOwnerIds?: string[];
  // directory name
  name: string;

  dateCreated: Date; //

  // owner id
  userId: string;

  // emtpy directory/ file array
  files?: IFile[];
}
