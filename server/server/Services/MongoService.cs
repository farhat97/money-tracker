using Microsoft.AspNetCore.Mvc;
using server.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using server.Resources;

namespace server.Services
{
    public class MongoService : IMongoService
    {
        private HttpClient httpClient;

        public MongoService()
        {
            // this.httpClient = client;
        }

        public Expense testFunction(Expense expense)
        {
            Console.WriteLine("Called test fn");
            var settings = MongoClientSettings.FromConnectionString(Keys.MONGO_CONNECTION_URI);

            // Set the ServerApi field of the settings object to Stable API version 1
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);

            // Create a new client and connect to the server
            var client = new MongoClient(settings);

            // Send a ping to confirm a successful connection
            try {
                var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
                Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
                return expense;
            } catch (Exception ex) {
                Console.WriteLine(ex);
                throw ex;
            }
        }

        public async Task PostNewExpense(Expense expense) 
        {
            var settings = MongoClientSettings.FromConnectionString(Keys.MONGO_CONNECTION_URI);
            var client = new MongoClient(settings);

            var database = client.GetDatabase("daily-expenses");
            var collection = database.GetCollection<BsonDocument>("expenses");

            var expenseBson = expense.ToBsonDocument();

            Console.WriteLine("Expense to bson = " + expenseBson);
            
            await collection.InsertOneAsync(expenseBson);
        }
    }
}