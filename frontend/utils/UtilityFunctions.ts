import { addChunkToFile } from "@/services/RequestService";

export const buildHref = (id: string, path: string) => {
  return path + "/" + id;
};

export const isTokenExpired = (token: string) => {
  try {
    // Decode the token
    const decodedToken = parseJwt(token);

    // Extract the expiration time from the decoded token
    const exp = decodedToken.exp;

    // Get the current time
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    // Compare the expiration time with the current time
    return exp < currentTime;
  } catch (error) {
    // If decoding or any other error occurs, consider token as expired
    return true;
  }
};

export function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const isUnauthorized = (status: number): boolean => {
  console.log(status);
  if (status === 401 || status === 403) {
    return true;
  }
  return false;
};

export const iconFromFileType = (fileType: number) => {
  switch (fileType) {
    //pdf
    case 0: {
      return "/pdf.svg";
    }
    // exe
    case 1: {
      return "/exe.svg";
    }
    case 2: {
      return "/jpg.svg";
    }
    case 3: {
      return "/jpg.svg";
    }
    case 4: {
      return "/png.svg";
    }
    case 5: {
      return "/docx.svg";
    }
    case 6: {
      return "/zip.svg";
    }
    case 7: {
      return "/zip.svg";
    }
    default: {
      return "/folder.svg";
    }
  }
};

export const extensionFromEnum = (input: number) => {
  switch (input) {
    //pdf
    case 0: {
      return ".pdf";
    }
    // exe
    case 1: {
      return ".exe";
    }
    case 2: {
      return ".jpg";
    }
    case 3: {
      return ".jpg";
    }
    case 4: {
      return ".png";
    }
    case 5: {
      return ".docx";
    }
    case 6: {
      return ".rar";
    }
    case 7: {
      return ".zip";
    }
  }
};

export const numberToMegaBytes = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(4);
};

export const fileTypeFromEnum = (input: string) => {
  if (input.includes(".pdf")) return "PDF";
  if (input.includes(".exe")) return "EXE";
  if (input.includes(".jpg")) return "JPG";
  if (input.includes(".jpeg")) return "JPEG";
  if (input.includes(".png")) return "PNG";
  if (input.includes(".docx")) return "DOCX";
  if (input.includes(".zip")) return "ZIP";
  if (input.includes(".rar")) return "RAR";
};

export const removeFileExtension = (fileName: string) => {
  let cleanedFileName = fileName.replace(" (1)", "");
  if (cleanedFileName.includes(".pdf"))
    return cleanedFileName.replace(".pdf", "");
  if (cleanedFileName.includes(".exe"))
    return cleanedFileName.replace(".exe", "");
  if (cleanedFileName.includes(".jpg"))
    return cleanedFileName.replace(".jpg", "");
  if (cleanedFileName.includes(".jpeg"))
    return cleanedFileName.replace(".jpeg", "");
  if (cleanedFileName.includes(".png"))
    return cleanedFileName.replace(".png", "");
  if (cleanedFileName.includes(".docx"))
    return cleanedFileName.replace(".docx", "");
  if (cleanedFileName.includes(".rar"))
    return cleanedFileName.replace(".rar", "");
  if (cleanedFileName.includes(".zip"))
    return cleanedFileName.replace(".zip", "");
};

const mimeTypes: Record<string, string> = {
  zip: "application/zip",
  appZip: "application/x-zip-compressed",
  pdf: "application/pdf",
  jpg: "image/jpg",
  sevenZip: "application/x-7z-compressed",
  jpeg: "image/jpeg",
  png: "image/png",
  txt: "text/plain",
  bin: "application/octet-stream",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  exe: "application/x-msdownload",
  // Add more file types as needed
};

export const convertBase64 = async (file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const base64Data = fileReader.result as string;
      const fileType = getFileType(base64Data); // Get the file type from the base64 data
      if (base64Data.length > 58058712) {
        reject(new Error("File too large"));
        return;
      }
      if (!fileType) {
        reject(new Error("Unsupported file type"));
        return;
      }
      const regexPattern = generateRegexForFileType(fileType); // Get the regex pattern for the file type
      if (!regexPattern) {
        reject(new Error("Regex pattern not found"));
        return;
      }
      if (!base64Data.match(new RegExp(`^${regexPattern}`))) {
        reject(new Error("File type mismatch"));
        return;
      }
      const base64WithoutPrefix = base64Data.replace(
        new RegExp(`^${regexPattern}`),
        ""
      ); // Remove the prefix from the base64 data

      resolve(base64WithoutPrefix);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    fileReader.readAsDataURL(file);
  });
};

export async function addChunk(chunkData: string, fileId: string) {
  await addChunkToFile(chunkData, fileId);
}

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export async function getImageSizeAndResize(
  base64String: string,
  maxSize: number
) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      const { width, height } = calculateSmallerSize(
        img.naturalWidth,
        img.naturalHeight,
        maxSize
      );
      resolve({
        originalWidth: img.naturalWidth,
        originalHeight: img.naturalHeight,
        resizedWidth: width,
        resizedHeight: height,
      });
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = `data:image;base64,${base64String}`;
  });
}

export function calculateSmallerSize(
  originalWidth: number,
  originalHeight: number,
  maxSize: number
) {
  let newWidth, newHeight;

  // Determine which dimension needs to be scaled down more to fit within the maxSize
  if (originalWidth > originalHeight) {
    // Width is larger, scale it down
    newWidth = maxSize;
    newHeight = (originalHeight / originalWidth) * maxSize;
  } else {
    // Height is larger or equal, scale it down
    newHeight = maxSize;
    newWidth = (originalWidth / originalHeight) * maxSize;
  }

  return { width: newWidth, height: newHeight };
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US");
}

export function buildBase64Data(mnemonic: string, base64Data: string): string {
  const regex = generateRegexForFileType(mnemonic);
  if (regex) {
    return `${regex}${base64Data}`;
  }
  throw new Error(`Mnemonic '${mnemonic}' not found in mimeTypes`);
}

export function getFileType(base64Data: string): string | undefined {
  for (const fileType in mimeTypes) {
    if (
      base64Data.startsWith(`data:${mimeTypes[fileType]};base64,`) ||
      base64Data.startsWith(`data:${mimeTypes[fileType].split(";")[0]};base64,`)
    ) {
      return fileType;
    }
  }
  return undefined;
}

export const extensionToMimeType: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  // Add more mappings as needed
};

export function generateRegexForFileExtension(
  fileExtension: string
): string | undefined {
  // Map file extension to mime type
  const mimeType = extensionToMimeType[fileExtension.toLowerCase()];
  if (mimeType) {
    return `data:${mimeType};base64,`;
  }
  return undefined;
}

function generateRegexForFileType(fileType: string): string | undefined {
  const mimeType = mimeTypes[fileType];
  if (mimeType) {
    return `data:${mimeType};base64,`;
  }
  return undefined;
}

export const downloadFileFromClient = (
  base64Data: string,
  filename: string
) => {
  // Convert base64 data to Blob
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });

  // Create URL for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create a link element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Append the link to the document body and trigger a click event
  document.body.appendChild(a);
  a.click();

  // Clean up: remove the link and revoke the URL
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
