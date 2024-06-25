using webApi.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
var db = new Db();
builder.Services.AddSingleton<Db>(db);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Call an ASP.NET Core web API with JavaScript
app.UseDefaultFiles();
app.UseStaticFiles();
//end

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
