namespace API.Models.Input
{
    public class DownloadRequest
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string FileId { get; set; }
    }
}
