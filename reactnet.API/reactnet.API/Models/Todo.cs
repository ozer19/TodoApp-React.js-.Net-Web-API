using System;
using System.ComponentModel.DataAnnotations;

namespace reactnet.API.Models
{
    public class Todo
    {
        [Key]
        public int TodoId { get; set; }
        public string? Title { get; set; }
        public string? Status { get; set; }
        public int ListId { get; set; }
        
    }
}

