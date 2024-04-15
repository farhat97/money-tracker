using server.Models;

namespace server.Services
{
    public interface IMongoService
    {
        public Expense testFunction(Expense expense);

        public Task PostNewExpense(Expense expense);

        public List<Expense> GetMonthExpenses();
    }
}