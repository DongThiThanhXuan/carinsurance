using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Claim = System.Security.Claims.Claim;

namespace BackEnd.Controllers
{
    [Route("api/login")]
    public class LoginController : Controller
    {
        private IConfiguration configuration;
        private AccountService accountService;
        public LoginController(AccountService _accountService, IConfiguration _configuration)
        {
            accountService = _accountService;
            configuration = _configuration;


        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("checkLogin")]
        public IActionResult CheckLogin([FromBody] Login login)
        {
            Debug.WriteLine("------------------------------");
            Debug.WriteLine(login.Email);
            Debug.WriteLine("------------------------------");
            try
            {
                var user = accountService.Login(login.Email, login.Password);

                if (user != null)
                {

                    var roles = user.Roles;
                    var claims = new List<Claim> {
                        new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                        new Claim("Accountid", user.Accountid.ToString()),
                        new Claim("Role",roles )
                    };


                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        issuer: configuration["Jwt:Issuer"],
                        audience: configuration["Jwt:Audience"],
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(5),
                        signingCredentials: signIn
                        );

                    return Ok(

                         new JwtSecurityTokenHandler().WriteToken(token)
                    );
                }
                else
                {
                    return Ok(

                         "Invalid credentials"
                   );
                }
            }
            catch
            {
                throw;
                return BadRequest();
            }
        }

        
    }
}
