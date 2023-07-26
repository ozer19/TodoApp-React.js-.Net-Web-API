using System;
using reactnet.API.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace reactnet.API.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
            
        }
        public DbSet<List> Lists { get; set; }
        public DbSet<Todo> Todos { get; set; }
    }
}

