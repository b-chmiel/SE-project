using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace se_project.Models
{
    public class ClientVisit
    {
        /// <summary>
        /// Gets or Sets ClientId
        /// </summary>
        [Required]
        [DataMember(Name="clientUsername")]
        public string ClientUsername { get; set; }
        
        /// <summary>
        /// Gets or Sets VisitId
        /// </summary>
        [Required]
        [DataMember(Name="visitId")]
        public int VisitId { get; set; }
    }
}