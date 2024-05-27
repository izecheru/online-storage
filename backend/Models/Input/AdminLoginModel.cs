using System.ComponentModel.DataAnnotations;

namespace API.Models.Input
{
    public class AdminLoginModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
