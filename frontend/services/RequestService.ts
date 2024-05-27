import { AxiosRequestConfig } from "axios";
import { AuthenticatedAxiosRequest } from "./authenticatedRequest";

export async function getProfileImage(userId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest(
    "GET",
    "/user/picture/data/" + userId,
    config,
  );
}

export async function uploadProfilePicture(data: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };
  return AuthenticatedAxiosRequest("POST", "/user/picture/upload", config);
}

export async function getFoldersOnRootByUserId(id: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest("GET", "/storage/dir/root/" + id, config);
}

export async function uploadFileData(data: string, token: string) {
  let config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };
  return AuthenticatedAxiosRequest("POST", "/storage/file/data", config);
}
export async function downloadFile(fileId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest(
    "GET",
    "/storage/file/download/" + fileId,
    config,
  );
}

export async function getFoldersByParentId(dirId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest("GET", "/storage/dir/" + dirId, config);
}

export async function getDataFromFileId(fileId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest(
    "GET",
    "/storage/file/data/" + fileId,
    config,
  );
}

export async function getContentFromSubdir(
  dirId: string,
  token: string,
  pageSize: number = 50,
  pageNumber: number = 1,
) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (pageSize === 0)
    return AuthenticatedAxiosRequest(
      "GET",
      "/storage/content/" + dirId + `/?pageSize=${54}&pageNumber=${1}`,
      config,
    );

  return AuthenticatedAxiosRequest(
    "GET",
    "/storage/content/" +
      dirId +
      `/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    config,
  );
}

export async function getFilesFromDir(dirId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest("GET", "/storage/file/" + dirId, config);
}

export async function createFile(data: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  return AuthenticatedAxiosRequest("POST", "/storage/file/create", config);
}

export async function createDirectory(data: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  return AuthenticatedAxiosRequest("POST", "/storage/dir/create", config);
}

export async function deleteFile(fileId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest(
    "DELETE",
    "/storage/file/delete/" + fileId,
    config,
  );
}

export async function deleteDirectory(directoryId: string, token: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return AuthenticatedAxiosRequest(
    "DELETE",
    "/storage/dir/delete/" + directoryId,
    config,
  );
}

export async function addChunkToFile(data: string, fileId: string) {
  let config: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return AuthenticatedAxiosRequest(
    "PUT",
    "/storage/file/addChunk/" + fileId,
    config,
  );
}
