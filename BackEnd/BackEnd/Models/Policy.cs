using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Policy
    {
        public Policy()
        {
            Estimates = new HashSet<Estimate>();
        }

        public int Policyid { get; set; }
        public int? Vehicleid { get; set; }
        public decimal? Vehiclewarranty { get; set; }
        public decimal? Vehicletheft { get; set; }
        public decimal? Vehicleaccident { get; set; }
        public decimal? Vehiclebody { get; set; }
        public decimal? Vehicleengine { get; set; }
        public decimal? Flood { get; set; }
        public decimal? Insurancepercent { get; set; }
        public byte? Policystatus { get; set; }

        public virtual Vehicle? Vehicle { get; set; }
        public virtual ICollection<Estimate> Estimates { get; set; }
    }
}
