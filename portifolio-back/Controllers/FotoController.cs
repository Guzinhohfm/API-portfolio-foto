using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using portifolio_back.Data;
using portifolio_back.Models;

namespace portifolio_back.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FotoController : ControllerBase
{

    private FotoContext _context;

    public FotoController(FotoContext context)
    {
        _context = context;
    }

    [HttpPost]
   public IActionResult AdicionaFoto([FromBody] Foto foto)
    {
        _context.Fotos.Add(foto);
        _context.SaveChanges();
        return CreatedAtAction(nameof(RecuperarFotoPorId), 
          new {id =  foto.Id}
        , foto);
    }

    [HttpGet]
    public IEnumerable<Foto> RecuperarFotosGeral([FromQuery]int take = 10)
    {
        return _context.Fotos.Take(take);
    }

    [HttpGet("{id}")]

    //interrogação significa que pode ou não ser nulo o valor de foto
    public IActionResult RecuperarFotoPorId(int id)
    {
        var foto =  _context.Fotos.FirstOrDefault(foto => foto.Id == id);

        if (foto == null) return NotFound();
        return Ok(foto);
    }
}
