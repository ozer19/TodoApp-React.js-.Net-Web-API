using System;
using System.Collections;
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
    // ListsController.cs
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly TodoContext _context;

        public ListsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/lists
        [HttpGet]
        public ActionResult<IEnumerable<List>> GetLists()
        {
            return Ok(_context.Lists.ToList());
        }

        // GET: api/lists/5
        [HttpGet("{id}")]
        public ActionResult<List> GetList(int id)
        {
            var list = _context.Lists.Find(id);
            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        // POST: api/lists
        [HttpPost]
        public ActionResult<List> CreateList(List list)
        {
            _context.Lists.Add(list);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetList), new { id = list.ListId }, list);
        }

        // PUT: api/lists/5
        [HttpPut("{id}")]
        public IActionResult UpdateList(int id, List list)
        {
            if (id != list.ListId)
            {
                return BadRequest();
            }

            _context.Entry(list).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/lists/5
        [HttpDelete("{id}")]
        public IActionResult DeleteList(int id)
        {
            var list = _context.Lists.Find(id);
            if (list == null)
            {
                return NotFound();
            }

            _context.Lists.Remove(list);
            _context.SaveChanges();
            return NoContent();
        }
    }

}

