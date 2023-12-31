﻿using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using portifolio_back.Data;
using portifolio_back.Models;
using System.IO;
using Microsoft.EntityFrameworkCore;

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
          new { id = foto.Id }
        , foto);
    }

    [HttpGet]
    public IEnumerable<Foto> RecuperarFotosGeral([FromQuery] int take = 10)
    {
        return _context.Fotos.Take(take);
    }

    [HttpGet("{id}")]

    //interrogação significa que pode ou não ser nulo o valor de foto
    public IActionResult RecuperarFotoPorId(int id)
    {
        var foto = _context.Fotos.FirstOrDefault(foto => foto.Id == id);

        if (foto == null) return NotFound();
        return Ok(foto);
    }

    [HttpDelete("{id}")]

    public IActionResult RemoverFotoPorId(int id)   
    {

        var foto = _context.Fotos.FirstOrDefault(foto => foto.Id == id);

        if (foto == null )
        {
            return NotFound();
          
        }
        else
        {
            _context.Fotos.Remove(foto);
            _context.SaveChanges();
            return Ok(foto);
        }

       
        
    }

    [HttpPut("{id}")]
    public  IActionResult EditarFoto(int id, [FromBody]Foto foto)
    {
        if (foto.Id == id)
        {
            _context.Fotos.Update(foto);
            _context.SaveChanges();
            return Ok("Os dados foram atualizados com sucesso") ;
        }
        else
        {
            return BadRequest("Não encontrado dados");
        }
  
    }



}
