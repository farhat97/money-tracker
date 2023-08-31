using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IMongoService mongoService;

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

        public ExpensesController(ILogger<ExpensesController> logger,
                                  IMongoService mongoService)
        {
            _logger = logger;
            this.mongoService = mongoService;
        }

        [HttpGet("expense-categories")]
        public IActionResult GetExpenseCategories()
        {
            return Ok(ExpenseCategories);
        }

        [HttpPost("add-expense")]
        public async Task<IActionResult> PostNewExpense(Expense expense)
        {
            _logger.LogInformation("Received post request, expense = " + 
                expense.Category + " , " + 
                expense.Amount
            );
            
            // Validate category
            if(!ExpenseCategories.Contains(expense.Category))
            {
                return BadRequest("Invalid expense category");
            }

            // Add current DateTime to expense
            expense.Date = DateTime.Now;
            _logger.LogInformation("Expense datetime = " + 
                expense.Date
            );

            // Call mongo service
            try
            {
               await this.mongoService.PostNewExpense(expense);
               return Ok("Expense created");
            }
            catch(Exception e) 
            {
                _logger.LogWarning("error found - " + e);
                return BadRequest();
            }
        }

        [HttpGet("get-monthtly-expenses")]
        public IActionResult GetMonthlyExpenses() 
        {
            this.mongoService.GetMonthExpenses();
            return Ok("Generic msg");
        }
    }
}
