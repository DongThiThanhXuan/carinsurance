using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Estimate
    {
        public Estimate()
        {
            Claims = new HashSet<Claim>();
        }

        public int Estimateid { get; set; }
        public int? Accountid { get; set; }
        public int? Policyid { get; set; }
        public string? Vehiclebodynumber { get; set; }
        public string? Vehicleenginenumber { get; set; }
        public int? Buyyear { get; set; }
        public byte? Numberyear { get; set; }
        public decimal? Marketvalue { get; set; }
        public decimal? Insurancefee { get; set; }
        public decimal? Valueestimate { get; set; }
        public DateTime? Paymentdate { get; set; }
        public DateTime? Expirationdate { get; set; }
        public string? Paypalbillno { get; set; }
        public string? Remark { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Policy? Policy { get; set; }
        public virtual ICollection<Claim> Claims { get; set; }
    }
}
