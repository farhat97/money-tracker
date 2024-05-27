using server.Models;

namespace server.Services
{
    public interface IExpenseService
    {
        public Dictionary<string, double> GetExpenseSummary(List<Expense> expenseList);
    }
}