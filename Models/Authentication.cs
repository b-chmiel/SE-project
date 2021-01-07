using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace se_project.Models
{
    public class Authentication
    {
        /// <summary>
        /// Gets or Sets Username
        /// </summary>
        [Required]
        [DataMember(Name="username")]
        public string Username { get; set; }

        /// <summary>
        /// Gets or Sets Password
        /// </summary>
        [Required]
        [DataMember(Name="password")]
        public string Password { get; set; }
    }
}