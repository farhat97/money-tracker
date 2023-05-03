using server.Services;

var builder = WebApplication.CreateBuilder(args);

var MyOrigins = "local_testing";

builder.Services.AddCors(options => 
{
    options.AddPolicy(name: MyOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000",
                                              "https://localhost:3000")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod()
                                 .AllowCredentials();

                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Read about registering services <--
builder.Services.AddScoped<IMongoService, MongoService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
