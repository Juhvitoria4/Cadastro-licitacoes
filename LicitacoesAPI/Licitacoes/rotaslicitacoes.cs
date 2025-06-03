using LicitacoesAPI.Licitacoes;
using LicitacoesAPI.Data;
using Microsoft.EntityFrameworkCore;

public static class RotasLicitacoes
{
    public static void AddRotasLicitacoes(this WebApplication app)
    {
        // GET: api/licitacao - lista todas as licitações
        app.MapGet("api/licitacao", async (AppDbContext context) =>
            await context.Licitacoes.ToListAsync()
        );

        // GET: api/licitacao/{id} - busca licitação pelo Id
        app.MapGet("api/licitacao/{id}", async (Guid id, AppDbContext context) =>
        {
            var licitacao = await context.Licitacoes.FindAsync(id);
            return licitacao is not null ? Results.Ok(licitacao) : Results.NotFound();
        });

        // POST: api/licitacao - cria nova licitação
        app.MapPost("api/licitacao", async (Licitacao licitacao, AppDbContext context) =>
        {
            if (await context.Licitacoes.AnyAsync(l => l.NumeroLicitacao == licitacao.NumeroLicitacao))
            {
                return Results.BadRequest("Essa licitação já existe.");
            }

            licitacao.DataHoraCadastro = DateTime.UtcNow;
            context.Licitacoes.Add(licitacao);
            await context.SaveChangesAsync();

            return Results.Created($"api/licitacao/{licitacao.Id}", licitacao);
        });

        // PUT: api/licitacao/{id} - atualiza licitação existente
        app.MapPut("api/licitacao/{id}", async (Guid id, Licitacao licitacao, AppDbContext context) =>
        {
            if (id != licitacao.Id)
                return Results.BadRequest();

            var existsNumero = await context.Licitacoes
                .AnyAsync(l => l.NumeroLicitacao == licitacao.NumeroLicitacao && l.Id != id);

            if (existsNumero)
                return Results.BadRequest("Número da licitação já existe.");

            context.Entry(licitacao).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await context.Licitacoes.AnyAsync(e => e.Id == id))
                    return Results.NotFound();
                else
                    throw;
            }

            return Results.NoContent();
        });

        // DELETE: api/licitacao/{id} - exclui licitação
        app.MapDelete("api/licitacao/{id}", async (Guid id, AppDbContext context) =>
        {
            var licitacao = await context.Licitacoes.FindAsync(id);
            if (licitacao == null)
                return Results.NotFound();

            context.Licitacoes.Remove(licitacao);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}
