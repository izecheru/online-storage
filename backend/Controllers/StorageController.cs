using API.Entities;
using API.Interfaces.Managers;
using API.Models.Input;
using API.Models.Output;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageController : ControllerBase
    {
        private readonly IDirectoryManager _directoryManager;
        private readonly IFileManager _fileManager;
        private readonly IFileDataManager _fileDataManager;
        public StorageController(IDirectoryManager directoryManager, IFileManager fileManager, IFileDataManager fileDataManager)
        {
            _directoryManager = directoryManager;
            _fileDataManager = fileDataManager;
            _fileManager = fileManager;
        }

        [Authorize(Policy = "User")]
        [HttpGet("file/data/{fileId}")]
        public async Task<IActionResult> GetFileData([FromRoute] string fileId)
        {
            try
            {
                var fileData = await _fileDataManager.Get(fileId);
                var base64Data = Convert.ToBase64String(fileData.Data);
                var dataUrl = $"data:{fileData.FileMnemonic};base64,{base64Data}";
                return Ok(dataUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpGet("file/download/{fileId}")]
        public async Task<IActionResult> DownloadFile([FromRoute] string fileId)
        {
            try
            {
                Func<FileTypeEnum, string> getFileExtension = (value) =>
                {
                    string extension = string.Empty;
                    switch (value)
                    {
                        case FileTypeEnum.PDF:
                            extension = ".pdf";
                            break;
                        case FileTypeEnum.EXE:
                            extension = ".exe";
                            break;
                        case FileTypeEnum.JPG:
                            extension = ".jpg";
                            break;
                        case FileTypeEnum.JPEG:
                            extension = ".jpeg";
                            break;
                        case FileTypeEnum.PNG:
                            extension = ".png";
                            break;
                        case FileTypeEnum.DOCX:
                            extension = ".docx";
                            break;
                        case FileTypeEnum.RAR:
                            extension = ".rar";
                            break;
                        case FileTypeEnum.ZIP:
                            extension = ".zip";
                            break;
                        default:
                            break;
                    }
                    return extension;
                };


                var file = await _fileManager.Get(fileId);
                var filename = file.Name + getFileExtension(file.FileType);
                var fileData = await _fileDataManager.Get(fileId);
                var downloadFile = new DownloadFileModel()
                {
                    FileName = filename,
                    Data = Convert.ToBase64String(fileData.Data)
                };
                return Ok(downloadFile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpGet("content/{dirId}")]
        public async Task<IActionResult> GetContentFromDirectory([FromRoute] string dirId, [FromQuery] int pageSize = 50, [FromQuery] int pageNumber = 1)
        {
            try
            {
                var files = await _fileManager.GetFilesByDirectoryId(dirId);
                var directories = await _directoryManager.GetDirectoriesFromParentId(dirId);
                var pagination = new Pagination();

                // Calculate total items
                int totalItems = files.Count + directories.Count;
                int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

                // If total items fit within a single page
                if (totalItems <= pageSize)
                {
                    pagination.PageSize = totalItems;
                    pagination.PageNumber = 1;
                    pagination.TotalPages = 1;

                    var paginatedResult = new PaginatedSubdirectory()
                    {
                        Directories = directories,
                        Files = files,
                        Pagination = pagination,
                        CountDirectories = directories.Count,
                        CountFiles = files.Count,
                    };

                    return Ok(paginatedResult);
                }

                // Separate pagination calculations
                int totalFilesPages = (int)Math.Ceiling((double)files.Count / pageSize);
                int totalDirPages = (int)Math.Ceiling((double)directories.Count / pageSize);

                int skip = (pageNumber - 1) * pageSize;

                // Ensure at least one directory is returned on each page
                int directorySkip = Math.Min(skip, directories.Count - 1);

                // Determine how many items to take for files and directories
                int filesToTake = Math.Min(pageSize, files.Count - skip);
                int directoriesToTake = Math.Min(pageSize, directories.Count - skip);

                // Paginate files and directories separately
                var paginatedFiles = files
                    .OrderBy(file => file.FileSize)
                    .Skip(skip)
                    .Take(filesToTake)
                    .ToList();

                var paginatedDirectories = directories
                    .Skip(directorySkip)
                    .Take(directoriesToTake)
                    .ToList();

                pagination.TotalPages = Math.Max(totalFilesPages, totalDirPages);
                pagination.PageNumber = pageNumber;
                pagination.PageSize = pageSize;

                var toReturn = new PaginatedSubdirectory
                {
                    Files = paginatedFiles,
                    Directories = paginatedDirectories,
                    Pagination = pagination,
                    CountDirectories = paginatedDirectories.Count,
                    CountFiles = paginatedFiles.Count
                };

                return Ok(toReturn);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        [Authorize(Policy = "User")]
        [HttpGet("file/{dirId}")]
        public async Task<IActionResult> GetFilesFromDirectory([FromRoute] string dirId, [FromQuery] int pageSize = 54, [FromQuery] int pageNumber = 1)
        {
            try
            {
                var files = await _fileManager.GetFilesByDirectoryId(dirId);
                var pagination = new Pagination();
                pagination.PageSize = files.Count;
                pagination.PageNumber = 1;
                pagination.TotalPages = 1;

                var onePage = new PaginatedFiles()
                {
                    Files = files,
                    Pagination = pagination
                };

                if (files.Count <= 54)
                    return Ok(onePage);

                var totalPages = (int)Math.Ceiling((double)files.Count / pageSize);
                int skip = (pageNumber - 1) * pageSize;
                var paginatedFiles = files
                    .OrderBy(file => file.FileSize)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToList();

                pagination.TotalPages = totalPages;
                pagination.PageNumber = pageNumber;
                pagination.PageSize = pageSize;

                var toReturn = new PaginatedFiles()
                {
                    Files = paginatedFiles,
                    Pagination = pagination
                };

                return Ok(toReturn);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpGet("dir/root/{userId}")]
        public async Task<IActionResult> GetDirectoriesOnRootByOwnerId([FromRoute] string userId)
        {
            try
            {
                var directories = await _directoryManager.GetDirectoriesOnRootByOwnerId(userId) ?? throw new KeyNotFoundException();
                return Ok(directories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpPut("dir/{dirId}/{newName}")]
        public async Task<IActionResult> RenameDirectoryById([FromRoute] string dirId, [FromRoute] string newName)
        {
            try
            {
                var dir = await _directoryManager.Get(dirId) ?? throw new KeyNotFoundException();
                dir.Name = newName;
                await _directoryManager.Update(dir);
                return Ok("Folder renamed!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpGet("dir/{dirId}")]
        public async Task<IActionResult> GetDirectoriesFromParentDirectory([FromRoute] string dirId)
        {
            try
            {
                var directories = await _directoryManager.GetDirectoriesFromParentId(dirId) ?? throw new KeyNotFoundException();
                return Ok(directories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpPost("dir/create")]
        public async Task<IActionResult> CreateDirectory([FromBody] DirectoryCreateModel toCreate)
        {
            try
            {
                await _directoryManager.Create(toCreate);
                return Ok("Directory was created!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpPost("file/create")]
        public async Task<IActionResult> CreateFile([FromBody] FileCreateModel toCreate)
        {
            try
            {
                var fileId = await _fileManager.Create(toCreate);
                var fileData = new FileData()
                {
                    Id = Program.GetGUID(),
                    Data = Convert.FromBase64String(toCreate.Data),
                    FileId = fileId,
                    FileMnemonic = toCreate.FileMnemonic
                };
                await _fileDataManager.Create(fileData);
                return Ok("File was created as well as data");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpDelete("dir/delete/{dirId}")]
        public async Task<IActionResult> DeleteDirectoryById([FromRoute] string dirId)
        {
            try
            {
                await _directoryManager.Delete(dirId);
                return Ok("Directory was deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "User")]
        [HttpDelete("file/delete/{fileId}")]
        public async Task<IActionResult> DeleteFileById([FromRoute] string fileId)
        {
            try
            {
                await _fileManager.Delete(fileId);
                return Ok("File was deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
