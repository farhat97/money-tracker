using server.Models;

namespace server.Services
{
    public interface IMongoService
    {
        public Expense testFunction(Expense expense);

        public void PostNewExpense(Expense expense);
    }
}