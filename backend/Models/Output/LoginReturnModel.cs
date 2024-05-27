namespace API.Models.Output
{
    public class LoginReturnModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string AuthToken { get; set; }
        public List<string> Role { get; set; }
    }
}
