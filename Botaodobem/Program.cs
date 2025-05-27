using Microsoft.EntityFrameworkCore;
using Botaodobem;

var builder = WebApplication.CreateBuilder(args);

// Configura serviços primeiro:
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost8080", policy =>
    {
        policy.WithOrigins("http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agora cria o app:
var app = builder.Build();

// Ativa o CORS
app.UseCors("AllowLocalhost8080");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// resto do seu código continua igual...

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Emocao.Any())
    {
        var sql = File.ReadAllText("banco.sql");
        db.Database.ExecuteSqlRaw(sql);
    }
}


app.MapGet("/emocoes", (AppDbContext db) =>
{
    var listaEmocoes = db.Emocao.ToList();
    return Results.Ok(listaEmocoes);
});

app.MapGet("/emocoes/{id}", async (int id, AppDbContext db) =>
{
    var emocoes = await db.Emocao.FindAsync(id);
    return emocoes is not null ? Results.Ok(emocoes) : Results.NotFound("Emocao não encontrado!");
});

app.MapGet("/emocoes/nome/{nome}", async (string nome, AppDbContext db) =>
{
    var emocoes = await db.Emocao.Where(e => e.Nome == nome).ToListAsync();
    return emocoes.Any() ? Results.Ok(emocoes) : Results.NotFound();
});

app.MapPost("/emocoes", async (AppDbContext db, Emocao emocao) =>
{
    db.Emocao.Add(emocao);
    await db.SaveChangesAsync();
    return Results.Created($"emocoes/{emocao.Id}", emocao);
});

app.MapPut("/emocoes/{id}", async (int id, AppDbContext db, Emocao updatedEmocao) =>
{
    var EmocaoAtual = await db.Emocao.FindAsync(id);

    if (EmocaoAtual == null)
    {
        return Results.NotFound("Emocao não encontrado!");
    }

    EmocaoAtual.Nome = updatedEmocao.Nome;
    EmocaoAtual.Frase = updatedEmocao.Frase;

    await db.SaveChangesAsync();

    return Results.Ok(EmocaoAtual);
});

app.MapDelete("/emocoes/{id}", async (int id, AppDbContext db) =>
{
    var emocao = await db.Emocao.FindAsync(id);

    if (emocao == null)
    {
        return Results.NotFound("Emoção não encontrado!");
    }

    db.Emocao.Remove(emocao);
    await db.SaveChangesAsync();

    return Results.Ok("Emoção Foi de base!");
});

app.Run();
