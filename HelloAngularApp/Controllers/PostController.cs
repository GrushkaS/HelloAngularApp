using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using HelloAngularApp.Models;

namespace HelloAngularApp.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : Controller
    {
        ApplicationContext db;
        public PostController(ApplicationContext context)
        {
            db = context;
            if (!db.Posts.Any())
            {
                db.Posts.Add(new Post { title = "C#", text = "aksjnfkjasdfjksadn"});
                db.Posts.Add(new Post { title = "Angular", text = "sdfoisdjfksdjkfsnd"});
                db.Posts.Add(new Post { title = "TypeScript", text = "kjsdfsdkfn"});
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Post> Get()
        {
            return db.Posts.ToList();
        }

        [HttpGet("{id}")]
        public Post Get(int id)
        {
            Post post = db.Posts.FirstOrDefault(x => x.Id == id);
            return post;
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            if (ModelState.IsValid)
            {
                db.Posts.Add(post);
                db.SaveChanges();
                return Ok(post);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Post post)
        {
            if (ModelState.IsValid)
            {
                db.Update(post);
                db.SaveChanges();
                return Ok(post);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Post post = db.Posts.FirstOrDefault(x => x.Id == id);
            if (post != null)
            {
                db.Posts.Remove(post);
                db.SaveChanges();
            }
            return Ok(post);
        }
    }
}