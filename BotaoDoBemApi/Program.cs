using Microsoft.EntityFrameworkCore;
using Pokedex;
using BotaoDoBemApi;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=pokemons.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();












app.MapGet("/", () => "Hello World!");

app.Run();