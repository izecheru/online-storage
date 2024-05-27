import IDirectory from "./IDirectory";

export interface FolderSliceState {
  currentFolder: IDirectory;
  navigatedFolders: IDirectory[];
}

export const emptyDirectory: IDirectory = {
  id: "",
  name: "",
  parentId: undefined,
  canMove: false,
  canDelete: false,
  size: 0,
  dateModified: new Date(),
  sharedWithOwnerIds: [],
  dateCreated: new Date(),
  userId: "",
  files: [],
};
