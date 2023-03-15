using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private AccountService accountService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;

        public AccountController(AccountService _accountService, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            accountService = _accountService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        //-----------------------------Tuan---------------------------
        [Produces("application/json")]
        [HttpGet("checkduplicatepersonid/{personid}")]
        public IActionResult CheckDuplicatePersonId(string personid)
        {
            try
            {
                return Ok(accountService.CheckDuplicatePersonId(personid));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("checkduplicateemail/{accountemail}")]
        public IActionResult CheckDuplicateEmail(string accountemail)
        {
            try
            {
                return Ok(accountService.CheckDuplicateEmail(accountemail));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("findbyemail/{email}")]
        public IActionResult FindByEmail(string email)
        {
            try
            {
                return Ok(accountService.FindByEmail(email));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createAccount2")]
        public IActionResult XuanCreateAccount([FromBody] Account account)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.CreateAccount2(account)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        //------------------------------Tuan code-----------------------
        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(accountService.findAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findById/{id}")]
        public IActionResult FindById(int id)
        {
            try
            {
                return Ok(accountService.findById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findAllCustomer")]
        public IActionResult FindAllCustomer()
        {
            try
            {
                return Ok(accountService.findAllCustomer());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateAccount")]
        public IActionResult UpdateAccount([FromBody] Account account)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.UpdateAccount(account)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createAccount")]
        public IActionResult CreateAccount([FromBody] Account account)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.CreateAccount(account)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("changePass")]
        public IActionResult ChangePass([FromBody] ChangePass changePass)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.ChangePass(changePass)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("updateStatus/{accountid}/{stt}")]
        public IActionResult UpdateStatus(int accountid, byte stt)
        {
            try
            {
                return Ok(accountService.UpdateStatus(accountid, stt))
               ;
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("checkInsuranceExp/{id}")]
        public IActionResult CheckInsuranceExp(int id)
        {
            try
            {
                return Ok(
                    new
                    {
                        Result = accountService.CheckInsuranceExp(id)
                    });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findListNotCotain/{id}")]
        public IActionResult findListNotCotain(int id)
        {
            try
            {
                return Ok(accountService.FindListNotContain(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        //--------------------Tuan--code-----------


    }
}
