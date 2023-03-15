using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/estimate")]
    public class EstimateController : Controller
    {
        private EstimateService estimateService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;

        public EstimateController(EstimateService _estimateService, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            estimateService = _estimateService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        //-----------------------------Phat---------------------------
        [Produces("application/json")]
        [HttpGet("findEstimateByid/{estimateid}")]
        public IActionResult findEstimateByid(int estimateid)
        {
            try
            {
                return Ok(estimateService.findEstimateByid(estimateid));
            }
            catch
            {
                return BadRequest();
            }
        }

        //------------------------------Phat code---------------------------------------

        [Produces("application/json")]
        [HttpGet("countEstimate")]
        public IActionResult CountEstimate()
        {
            try
            {
                return Ok(estimateService.countEstimate());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findAllContract")]
        public IActionResult FindAllContract()
        {
            try
            {
                return Ok(estimateService.findAllContract());
            }
            catch
            {
                return BadRequest();
            }
        }

        //----------------------Phat-Code----------------------------------
        [Produces("application/json")]
        [HttpGet("findAllEstimate")]
        public IActionResult FindAllEstimate()
        {
            try
            {
                return Ok(estimateService.findAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createEstimate")]
        public IActionResult CreateEstimate([FromBody] Estimate estimate)
        {
            try
            {
                return Ok(new
                {
                    Result = estimateService.createEstimate(estimate)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("findAllEstimateByAccount/{accountid}")]
        public IActionResult findAllEstimateByAccount(int accountid)
        {
            try
            {
                return Ok(estimateService.findAllEstimateByAccount(accountid));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
