using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/policy")]
    public class PolicyController : Controller
    {
        private PolicyService policyService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;

        public PolicyController(PolicyService _policyService, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            policyService = _policyService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        //-----------------------------Phat---------------------------
        [Produces("application/json")]
        [HttpGet("findPolicy/{policyid}")]
        public IActionResult FindPolicy(int policyid)
        {
            try
            {
                return Ok(policyService.FindPolicy(policyid));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("findAllPolicy")]
        public IActionResult findAllPolicy()
        {
            try
            {
                return Ok(policyService.findAllPolicy());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createPolicy")]
        public IActionResult CreatePolicy([FromBody] Policy policy)
        {
            try
            {
                return Ok(new
                {
                    Result = policyService.CreatePolicy(policy)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updatePolicy")]
        public IActionResult UpdateBrand([FromBody] Policy policy)
        {
            try
            {
                return Ok(new
                {
                    Result = policyService.UpdatePolicy(policy)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        //------------------------------Phat code---------------------------------------





        //--------------------------------------------------------
        //---Phat--Code
        [Produces("application/json")]
        [HttpGet("findAllPolicyD")]
        public IActionResult FindAllPolicyD()
        {
            try
            {
                return Ok(policyService.findAllPolicyD());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
