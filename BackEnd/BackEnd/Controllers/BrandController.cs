using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/brand")]
    public class BrandController : Controller
    {
        private BrandService brandService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;

        public BrandController(BrandService _brandService, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            brandService = _brandService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        //-----------------------------Phat---------------------------


        //------------------------------Phat code---------------------------------------

        [Produces("application/json")]
        [HttpGet("findAllBrand")]
        public IActionResult FindAllBrand()
        {
            try
            {
                return Ok(brandService.findAllBrand());
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
                return Ok(brandService.findById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createBrand")]
        public IActionResult CreateBrand([FromBody] Brandvehicle brand)
        {
            try
            {
                return Ok(new
                {
                    Result = brandService.CreateBrand(brand)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateBrand")]
        public IActionResult UpdateBrand([FromBody] Brandvehicle brand)
        {
            try
            {
                return Ok(new
                {
                    Result = brandService.UpdateBrand(brand)
                });
            }
            catch
            {
                return BadRequest();
            }
        }


        //--------------------------------------------------------

    }
}
