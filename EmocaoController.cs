using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Botaodobem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmocaoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmocaoController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Emocao
        [HttpPost]
        public async Task<IActionResult> PostEmocao([FromBody] Emocao emocao)
        {
            if (emocao == null || string.IsNullOrWhiteSpace(emocao.Nome))
            {
                return BadRequest("Dados inválidos.");
            }

            _context.Emocoes.Add(emocao);
            await _context.SaveChangesAsync();

            // Retorna 201 Created com a URL do recurso criado
            return CreatedAtAction(nameof(GetEmocaoById), new { id = emocao.Id }, emocao);
        }

        // GET: api/Emocao/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmocaoById(int id)
        {
            var emocao = await _context.Emocoes.FindAsync(id);
            if (emocao == null)
            {
                return NotFound();
            }

            return Ok(emocao);
        }
    }
}
