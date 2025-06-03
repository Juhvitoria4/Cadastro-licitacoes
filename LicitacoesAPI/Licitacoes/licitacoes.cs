namespace LicitacoesAPI.Licitacoes
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Licitacao
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public DateTime DataHoraCadastro { get; set; }

        [Required]
        public DateTime DataHoraAberturaProcesso { get; set; }

        [Required]
        public string? CodigoComprador { get; set; }

        [Required]
        public DateTime DataHoraInicioPropostas { get; set; }

        [Required]
        public DateTime DataHoraFimPropostas { get; set; }

        public string? Observacoes { get; set; }

        [Required]
        public string? Resumo { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Número da licitação deve ser alfanumérico.")]
        public string? NumeroLicitacao { get; set; }
    }
}
