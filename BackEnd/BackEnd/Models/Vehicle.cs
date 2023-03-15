using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            Policies = new HashSet<Policy>();
        }

        public int Vehicleid { get; set; }
        public int? Brandid { get; set; }
        public string? Vehiclemodel { get; set; }
        public string? Vehicleversion { get; set; }
        public int? Yearofmanufacture { get; set; }
        public decimal? Vehicleprice { get; set; }

        public virtual Brandvehicle? Brand { get; set; }
        public virtual ICollection<Policy> Policies { get; set; }
    }
}
