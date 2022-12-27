using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private static List<string> ExpenseCategories = new List<string>()
        {
            "Grocery",
            "Eating out",
            "Apt Expenses",
            "Misc",
            "Toys",
            "Misc Required",
            "Car",
            "Zeus",
            "Transport",
            "Misc Events"
        };

        private readonly ILogger<ExpensesController> _logger;

        public ExpensesController(ILogger<ExpensesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("expenseCategories")]
        public IActionResult GetExpenseCategories()
        {
            return Ok(ExpenseCategories);
        }

        [HttpPost("add-expense")]
        public IActionResult PostNewExpense(Expense expense)
        {
            // Validate category
            if(!ExpenseCategories.Contains(expense.category))
            {
                return BadRequest("Invalid expense category");
            }

            return Ok(expense);
        }
    }
}
