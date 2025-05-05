using Microsoft.EntityFrameworkCore;
using Botaodobem;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

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

app.Run();
