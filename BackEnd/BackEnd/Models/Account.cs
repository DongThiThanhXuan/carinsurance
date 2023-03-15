using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Account
    {
        public Account()
        {
            Estimates = new HashSet<Estimate>();
        }

        public int Accountid { get; set; }
        public string? Personid { get; set; }
        public string? Accountemail { get; set; }
        public string? Passwords { get; set; }
        public string? Accountname { get; set; }
        public string? Accountadd { get; set; }
        public string? Accountphone { get; set; }
        public string? Roles { get; set; }
        public byte? Accountstatus { get; set; }

        public virtual ICollection<Estimate> Estimates { get; set; }
    }
}
