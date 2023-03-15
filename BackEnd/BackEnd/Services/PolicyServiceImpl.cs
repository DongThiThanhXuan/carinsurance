using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class PolicyServiceImpl : PolicyService
    {
        private DatabaseContext db;
        public PolicyServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }



        //--------------------------Phat code--------------------------------
        public dynamic findAllPolicy()
        {
            return db.Policys.Select(b => new
            {
                Policyid = b.Policyid,
                Vehicleid = b.Vehicle.Vehicleid,
                Brandid = b.Vehicle.Brandid,
                Vehiclewarranty = b.Vehiclewarranty,
                Brandname = b.Vehicle.Brand.Brandname,
                Vehiclemodel = b.Vehicle.Vehiclemodel,
                Vehicleversion = b.Vehicle.Vehicleversion,
                Vehicletheft = b.Vehicletheft,
                Vehicleaccident = b.Vehicleaccident,
                Vehiclebody = b.Vehiclebody,
                Vehicleengine = b.Vehicleengine,
                Flood = b.Flood,
                Insurancepercent = b.Insurancepercent,
                Policystatus = b.Policystatus
            }).OrderByDescending(p => p.Policyid).ToList();
        }
        public bool CreatePolicy(Policy policy)
        {
            try
            {
                db.Policys.Add(policy);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }

        public bool UpdatePolicy(Policy policy)
        {
            try
            {
                db.Entry(policy).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }


        public dynamic FindPolicy(int policyid)
        {
            return db.Policys.Where(s => s.Policyid == policyid).Select(b => new
            {
                Policyid = b.Policyid,
                Vehicleid = b.Vehicle.Vehicleid,
                Vehiclewarranty = b.Vehiclewarranty,
                Brandid = b.Vehicle.Brandid,
                Brandname = b.Vehicle.Brand.Brandname,
                Vehiclemodel = b.Vehicle.Vehiclemodel,
                Vehicleversion = b.Vehicle.Vehicleversion,
                Vehicletheft = b.Vehicletheft,
                Vehicleaccident = b.Vehicleaccident,
                Vehiclebody = b.Vehiclebody,
                Vehicleengine = b.Vehicleengine,
                Flood = b.Flood,
                Insurancepercent = b.Insurancepercent,
                Policystatus = b.Policystatus
            }).FirstOrDefault();
        }



        //-------------------------------Phat code----------------------------
        //-----dat---code
        public dynamic findAllPolicyD()
        {
            return db.Policys.Select( po=> new
            {
                Policyid=po.Policyid,
                Vehicleid = po.Vehicleid,
                Vehiclewarranty = po.Vehiclewarranty,
                Vehicletheft = po.Vehicletheft,
                Vehicleaccident = po.Vehicleaccident,
                Vehiclebody = po.Vehiclebody,
                Vehicleengine = po.Vehicleengine,
                Flood = po.Flood,
                Insurancepercent = po.Insurancepercent,
                Policystatus = po.Policystatus
            }).ToList();
        }
    }
}