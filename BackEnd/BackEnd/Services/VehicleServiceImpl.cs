using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class VehicleServiceImpl : VehicleService
    {
        private DatabaseContext db;
        public VehicleServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        //--------------------------Phat code--------------------------------
        public dynamic showByid(int vehicleid)
        {
            return db.Vehicles.Where(s => s.Vehicleid == vehicleid).Select(v => new
            {
                Vehicleid = v.Vehicleid,
                Brandid = v.Brandid,
                Brand = v.Brand.Brandname,
                Yearofmanufacture = v.Yearofmanufacture,
                Vehiclemodel = v.Vehiclemodel,
                Vehicleversion = v.Vehicleversion,
                Vehicleprice = v.Vehicleprice
            }).FirstOrDefault();
        }

        //-------------------------------Phat code----------------------------
        public dynamic findAllVehicle()
        {
            return db.Vehicles.Select(v => new
            {
                Vehicleid = v.Vehicleid,
                Brandid = v.Brandid,
                Brand = v.Brand.Brandname,
                Yearofmanufacture = v.Yearofmanufacture,
                Vehiclemodel = v.Vehiclemodel,
                Vehicleversion = v.Vehicleversion,
                Vehicleprice = v.Vehicleprice
            }).ToList();
        }

        public bool CreateVehicle(Vehicle vehicle)
        {
            try
            {
                db.Vehicles.Add(vehicle);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }

        public bool UpdateVehicle(Vehicle vehicle)
        {
            try
            {
                db.Entry(vehicle).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }

        public bool CheckExistVehicle(int brand, string model, string version, int year)
        {
            var result = db.Vehicles.FirstOrDefault(v => v.Brandid == brand && v.Vehiclemodel == model && v.Vehicleversion == version && v.Yearofmanufacture == year);
            return result != null;
        }

        public bool CheckEditVehicle(int id, int brand, string model, string version, int year)
        {
            var listVehicle = db.Vehicles.Where(v => v.Vehicleid != id)
                .Select(v => new
                {
                    Vehicleid = v.Vehicleid,
                    Brandid = v.Brandid,
                    Brand = v.Brand.Brandname,
                    Yearofmanufacture = v.Yearofmanufacture,
                    Vehiclemodel = v.Vehiclemodel,
                    Vehicleversion = v.Vehicleversion,
                    Vehicleprice = v.Vehicleprice
                }).ToList();
            var result = listVehicle.FirstOrDefault(v => v.Brandid == brand && v.Vehiclemodel == model && v.Vehicleversion == version && v.Yearofmanufacture == year);
            return result != null;
        }

        public dynamic countVehicle()
        {
            return db.Brandvehicles
                .Join(db.Vehicles.
                 GroupBy(v => v.Brandid).Select(b => new
                 {
                     Brandid = b.Key,
                     Count = b.Select(a => a.Vehicleid).Count()
                 }),
                 ve => ve.Brandid,
                 br => br.Brandid,
                 (ve, br) => new { ve, br })
                .Select(vb => new
                {
                    Brandid = vb.ve.Brandid,
                    Brandname = vb.ve.Brandname,
                    Count = vb.br.Count,
                });  
        }
    }
}
