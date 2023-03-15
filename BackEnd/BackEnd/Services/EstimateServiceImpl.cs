using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class EstimateServiceImpl : EstimateService
    {
        private DatabaseContext db;
        public EstimateServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        //--------------------------Phat code--------------------------------
        public dynamic findEstimateByid(int estimateid)
        {
            return db.Estimates.Where(x => x.Estimateid == estimateid).Select(est => new
            {
                Estimateid = est.Estimateid,
                Accountid = est.Accountid,
                Personid = est.Account.Personid,
                Fullname = est.Account.Accountname,
                Email = est.Account.Accountemail,
                Phone = est.Account.Accountphone,
                Address = est.Account.Accountadd,
                Vehiclebrand = est.Policy.Vehicle.Brand.Brandname,
                Vehiclemodel = est.Policy.Vehicle.Vehiclemodel,
                Vehicleversion = est.Policy.Vehicle.Vehicleversion,
                Vehicleyear = est.Policy.Vehicle.Yearofmanufacture,
                Policyid = est.Policyid,
                Vehicletheft = est.Policy.Vehicletheft,
                Vehicleaccident = est.Policy.Vehicleaccident,
                Vehiclebody = est.Policy.Vehiclebody,
                Vehicleengine = est.Policy.Vehicleengine,
                Flood = est.Policy.Flood,
                Insurancepercent = est.Policy.Insurancepercent,
                Vehiclebodynumber = est.Vehiclebodynumber,
                Vehicleenginenumber = est.Vehicleenginenumber,
                Buyyear = est.Buyyear,
                Numberyear = est.Numberyear,
                Marketvalue = est.Marketvalue,
                Insurancefee = est.Insurancefee,
                Valueestimate = est.Valueestimate,
                Paymentdate = est.Paymentdate,
                Expirationdate = est.Expirationdate,
                Paypalbillno = est.Paypalbillno,
                Remark = est.Remark,

            }).FirstOrDefault();
        }
        //-------------------------------Phat code----------------------------
        public dynamic countEstimate()
        {
            return db.Estimates
                .Where(s => s.Paymentdate.Value.Year == DateTime.Now.Year)
                .GroupBy(es => es.Paymentdate.Value.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    Count = g.Count(),
                    Sum = g.Select(s => s.Valueestimate).Sum()
                }).OrderByDescending(x => x.Month).Take(3).OrderBy(x => x.Month);
        }

        public dynamic findAllContract()
        {
            return db.Estimates.Select(est => new
            {
                Estimateid = est.Estimateid,
                Accountid = est.Accountid,
                Personid = est.Account.Personid,
                Fullname = est.Account.Accountname, 
                Email = est.Account.Accountemail,
                Phone = est.Account.Accountphone,
                Address = est.Account.Accountadd,
                Vehiclebrand = est.Policy.Vehicle.Brand.Brandname,
                Vehiclemodel = est.Policy.Vehicle.Vehiclemodel,
                Vehicleversion = est.Policy.Vehicle.Vehicleversion,
                Vehicleyear = est.Policy.Vehicle.Yearofmanufacture,
                Policyid = est.Policyid,
                Vehicletheft = est.Policy.Vehicletheft,
                Vehicleaccident = est.Policy.Vehicleaccident,
                Vehiclebody = est.Policy.Vehiclebody,
                Vehicleengine = est.Policy.Vehicleengine,
                Flood = est.Policy.Flood,
                Insurancepercent = est.Policy.Insurancepercent,
                Vehiclebodynumber = est.Vehiclebodynumber,
                Vehicleenginenumber = est.Vehicleenginenumber,
                Buyyear = est.Buyyear,
                Numberyear = est.Numberyear,
                Marketvalue = est.Marketvalue,
                Insurancefee = est.Insurancefee,
                Valueestimate = est.Valueestimate,
                Paymentdate = est.Paymentdate,
                Expirationdate = est.Expirationdate,
                Paypalbillno = est.Paypalbillno,
                Remark = est.Remark,
            }).OrderByDescending(e => e.Paymentdate).ToList();
        }


        //----Phat Code---
        public dynamic createEstimate(Estimate estimate)
        {
            try
            {
                db.Estimates.Add(estimate);
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }


        public dynamic findAll()
        {
            return db.Estimates.Select(est => new
            {
                Estimateid = est.Estimateid,
                Accountid = est.Accountid,
                Policyid = est.Policyid,
                Vehiclebodynumber = est.Vehiclebodynumber,
                Vehicleenginenumber = est.Vehicleenginenumber,
                Buyyear = est.Buyyear,
                Numberyear = est.Numberyear,
                Marketvalue = est.Marketvalue,
                Insurancefee = est.Insurancefee,
                Valueestimate = est.Valueestimate,
                Paymentdate = est.Paymentdate,
                Expirationdate = est.Expirationdate,
                Paypalbillno = est.Paypalbillno,
                Remark = est.Remark,

            }).OrderByDescending(x => x.Estimateid).ToList();
        }

        public dynamic findAllEstimateByAccount(int accountId)
        {
            return db.Estimates.Where(x => x.Accountid == accountId).Select(est => new
            {
                Estimateid = est.Estimateid,
                Accountid = est.Accountid,
                Policyid = est.Policyid,
                Vehiclebodynumber = est.Vehiclebodynumber,
                Vehicleenginenumber = est.Vehicleenginenumber,
                Buyyear = est.Buyyear,
                Numberyear = est.Numberyear,
                Marketvalue = est.Marketvalue,
                Insurancefee = est.Insurancefee,
                Valueestimate = est.Valueestimate,
                Paymentdate = est.Paymentdate,
                Expirationdate = est.Expirationdate,
                Paypalbillno = est.Paypalbillno,
                Remark = est.Remark,

            }).OrderByDescending(x => x.Estimateid).ToList();
        }

        public bool UpdateEstimate(int id)
        {
            throw new NotImplementedException();
        }
    
    }
}
