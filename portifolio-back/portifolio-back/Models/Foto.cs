using System.ComponentModel.DataAnnotations; //validações 

namespace portifolio_back.Models;

public class Foto
{
 
    [Key]
    [Required]
    public int Id { get; set; }

    [Required(ErrorMessage = "Título da foto obrigatório")]
    public string TituloFoto { get; set; }

    [Required(ErrorMessage = "Informe uma descrição válida para a foto")]
    [MaxLength(500, ErrorMessage = "O tamanho da descrição não pode ultrapassar 500 caracteres")]
    public string DescricaoFoto { get; set; }

    [Required]
    public string TamanhoFoto { get; set; }

    [Required]
    public string Arquivo64Foto { get; set; }

   
}
