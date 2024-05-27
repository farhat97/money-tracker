using server.Models;

namespace server.Services 
{
    public class ExpenseService : IExpenseService
    {
        public ExpenseService() 
        {
            // empty constructor
        }

        public Dictionary<string, double> GetExpenseSummary(List<Expense> expenseList)
        {
            Dictionary<string, double> expenseSummary = new Dictionary<string, double>();
            // TODO: Find a nicer foreach
            foreach(var expense in expenseList)
            {
                if(expenseSummary.ContainsKey(expense.Category))
                {
                    expenseSummary[expense.Category] += expense.Amount;
                }
                else
                {
                    expenseSummary.Add(expense.Category, expense.Amount);
                }

            }

            return expenseSummary;
        }
    }
}