using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Claim
    {
        public Claim()
        {
            Claimdetails = new HashSet<Claimdetail>();
        }

        public int Claimid { get; set; }
        public int? Estimateid { get; set; }
        public DateTime? Submitdate { get; set; }
        public byte? Vehicletheftstt { get; set; }
        public decimal? Vehicletheftmoney { get; set; }
        public byte? Vehicleaccidentstt { get; set; }
        public decimal? Vehicleaccidentmoney { get; set; }
        public byte? Vehiclebodystt { get; set; }
        public decimal? Vehiclebodymoney { get; set; }
        public byte? Vehicleenginestt { get; set; }
        public decimal? Vehiclemoney { get; set; }
        public byte? Approvalstt { get; set; }
        public decimal? Approvalvehicletheftmoney { get; set; }
        public decimal? Approvalvehicleaccidentmoney { get; set; }
        public decimal? ApprovalVehiclebodymoney { get; set; }
        public decimal? ApprovalVehiclemoney { get; set; }
        public byte? Claimstt { get; set; }
        public string? Reamark { get; set; }

        public virtual Estimate? Estimate { get; set; }
        public virtual ICollection<Claimdetail> Claimdetails { get; set; }
    }
}
