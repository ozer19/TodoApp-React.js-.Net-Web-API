using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactnet.API.Data;
using reactnet.API.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactnet.API.Controllers
{
    // TodosController.cs
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodosController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/todos
        [HttpGet]
        public ActionResult<IEnumerable<Todo>> GetTodos()
        {
            return Ok(_context.Todos.ToList());
        }

        // GET: api/todos/5
        [HttpGet("{id}")]
        public ActionResult<Todo> GetTodo(int id)
        {
            var todo = _context.Todos.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // GET: api/lists/5/todos
        [HttpGet("~/api/lists/{listId}/todos")]
        public ActionResult<IEnumerable<Todo>> GetTodosByListId(int listId)
        {
            var todos = _context.Todos.Where(t => t.ListId == listId).ToList();
            return Ok(todos);
        }

        // POST: api/todos
        [HttpPost]
        public ActionResult<Todo> CreateTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetTodo), new { id = todo.TodoId }, todo);
        }

        // PUT: api/todos/5
        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, Todo todo)
        {
            if (id != todo.TodoId)
            {
                Console.WriteLine("todo id = " +todo.TodoId+" id = "+ id);
                return BadRequest();
            }

            _context.Entry(todo).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/todos/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = _context.Todos.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            _context.SaveChanges();
            return NoContent();
        }
    }

}

