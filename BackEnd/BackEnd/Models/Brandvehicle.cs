using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Brandvehicle
    {
        public Brandvehicle()
        {
            Vehicles = new HashSet<Vehicle>();
        }

        public int Brandid { get; set; }
        public string? Brandname { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
