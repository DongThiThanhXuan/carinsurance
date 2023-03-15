using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Claimdetail
    {
        public int Claimdetailsid { get; set; }
        public int? Claimid { get; set; }
        public string? Filenames { get; set; }

        public virtual Claim? Claim { get; set; }
    }
}
