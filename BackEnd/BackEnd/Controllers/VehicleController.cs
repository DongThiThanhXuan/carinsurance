using BackEnd.Helpers;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/vehicle")]
    public class VehicleController : Controller
    {
        private VehicleService vehicleService;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;

        public VehicleController(VehicleService _vehicleService, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            vehicleService = _vehicleService;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        //-----------------------------Phat---------------------------
        [Produces("application/json")]
        [HttpGet("showByid/{vehicleid}")]
        public IActionResult showByid(int vehicleid)
        {
            try
            {
                return Ok(vehicleService.showByid(vehicleid));
            }
            catch
            {
                return BadRequest();
            }
        }

        //------------------------------Phat code---------------------------------------

        [Produces("application/json")]
        [HttpGet("findAllVehicle")]
        public IActionResult FindAllVehicle()
        {
            try
            {
                return Ok(vehicleService.findAllVehicle());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createVehicle")]
        public IActionResult CreateVehicle([FromBody] Vehicle vehicle)
        {
            try
            {
                return Ok(new
                {
                    Result = vehicleService.CreateVehicle(vehicle)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("updateVehicle")]
        public IActionResult UpdateBrand([FromBody] Vehicle vehicle)
        {
            try
            {
                return Ok(new
                {
                    Result = vehicleService.UpdateVehicle(vehicle)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("checkexistvehicle/{brand}/{model}/{version}/{year}")]
        public IActionResult CheckExistVehicle(int brand, string model, string version, int year)
        {
            try
            {
                return Ok(
                    new
                    {
                        Result = vehicleService.CheckExistVehicle(brand, model, version, year)
                    });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("checkeditvehicle/{id}/{brand}/{model}/{version}/{year}")]
        public IActionResult CheckEditVehicle(int id, int brand, string model, string version, int year)
        {
            try
            {
                return Ok(
                    new
                    {
                        Result = vehicleService.CheckEditVehicle(id, brand, model, version, year)
                    });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("countvehicle")]
        public IActionResult CountVehicle()
        {
            try
            {
                return Ok(vehicleService.countVehicle());
            }
            catch
            {
                return BadRequest();
            }
        }

        //--------------------------------------------------------

    }
}
