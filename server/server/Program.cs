using server.Services;

var builder = WebApplication.CreateBuilder(args);

var MyOrigins = "local_testing";

builder.Services.AddCors(options => 
{
    options.AddPolicy(name: MyOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000",
                                              "https://localhost:3000",
                                              "https://6af4-2601-243-2200-ee50-5073-c865-87f7-8e79.ngrok-free.app")
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

app.UseCors(MyOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
