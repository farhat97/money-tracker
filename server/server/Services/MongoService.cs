using server.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using server.Resources;
using System.Text.Json;

namespace server.Services
{
    public class MongoService : IMongoService
    {
        private HttpClient httpClient;

        private static readonly MongoClientSettings mongoSettings = MongoClientSettings.FromConnectionString(Keys.MONGO_CONNECTION_URI);
        private static readonly MongoClient mongoClient = new MongoClient(mongoSettings);

        private IMongoDatabase mongoDatabase;
        private IMongoCollection<Expense> dbCollection;


        public MongoService()
        {
            // this.httpClient = client;
            this.mongoDatabase = mongoClient.GetDatabase("daily-expenses");
            this.dbCollection = mongoDatabase.GetCollection<Expense>("expenses");
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

            Console.WriteLine("Expense to string = " + JsonSerializer.Serialize(expense));
            
            await this.dbCollection.InsertOneAsync(expense);
        }

        /// <summary>
        /// Call the first of every month to generate get all expenses for the previous month
        /// </summary>
        public List<Expense> GetMonthExpenses()
        {
            // filter example: { date : { $gte: ISODate('2023-08-01'), $lte: ISODate('2023-08-31') } }

            DateTime dateObj = DateTime.Now;
            Console.WriteLine("dateobj example. Month = " + dateObj.Month + "\nDaysInMonth = " + 
                DateTime.DaysInMonth(DateTime.Now.Year, 2));

            DateTime today = DateTime.Now;

            // If this call happens in January, assign month to 12 (December)
            int previousMonth = today.Month == 1 ? 12 : today.Month - 1;
            // Same with current year. If January, assign currentYear to last year
            int currentYear = today.Month == 1 ? DateTime.Now.AddYears(-1).Year : DateTime.Now.Year;
            
            var filter =
                Builders<Expense>.Filter.Gte(expense =>
                    expense.Date, DateTime.Now);

            var expenses =
                 this.dbCollection.Find(
                     expense => expense.Date >= new DateTime(currentYear, previousMonth, 01) &&
                                expense.Date <= 
                                    new DateTime(currentYear, previousMonth, DateTime.DaysInMonth(currentYear, previousMonth))
                 ).ToList();

            Console.WriteLine("Got expenses =\n");
            foreach (var ex in expenses)
            {
                Console.WriteLine(ex.Category + " - " + ex.Amount + " on " + ex.Date);
            }

            return expenses;
        }
    }
}