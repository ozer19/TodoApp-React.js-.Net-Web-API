using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace reactnet.API.Models
{
    public class List
    {
        [Key]
        public int ListId { get; set; }
        public string? Name { get; set; }
    }
}