using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    [BsonIgnoreExtraElements]
    public class Expense
    {
        // public int Id { get; set; }

        public double Amount { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }
    }
}
