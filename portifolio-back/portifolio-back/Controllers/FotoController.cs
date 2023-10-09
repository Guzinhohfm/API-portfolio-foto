using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using portifolio_back.Models;

namespace portifolio_back.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FotoController : ControllerBase
{
    private static List<Foto> fotos = new List<Foto>();
    private static int Id = 1;

    [HttpPost]
   public IActionResult AdicionaFoto([FromBody] Foto foto)
    {
        foto.Id = Id++;
        fotos.Add(foto);
        return CreatedAtAction(nameof(RecuperarFotoPorId), new {id =  foto.Id}
        , foto);
    }

    [HttpGet]
    public IEnumerable<Foto> RecuperarFotosGeral([FromQuery]int take = 10)
    {
        return fotos.Take(take);
    }

    [HttpGet("{id}")]

    //interrogação significa que pode ou não ser nulo o valor de foto
    public IActionResult RecuperarFotoPorId(int id)
    {
        var foto =  fotos.FirstOrDefault(foto => foto.Id == id);

        if (foto == null) return NotFound();
        return Ok(foto);
    }
}
