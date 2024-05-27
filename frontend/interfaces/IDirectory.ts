import IFile from "./IFile";

export default interface IDirectory {
  id: string;
  parentId?: string;
  canMove: boolean;
  canDelete: boolean;
  size?: number;
  dateModified?: Date;
  sharedWithOwnerIds?: string[];
  name: string;
  dateCreated: Date;
  userId: string;
  files?: IFile[];
}
