using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class BrandServiceImpl : BrandService
    {
        private DatabaseContext db;
        public BrandServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }



        //--------------------------Phat code--------------------------------




        //-------------------------------Phat code----------------------------
        public dynamic findAllBrand()
        {
            return db.Brandvehicles.Select(b => new
            {
                Brandid = b.Brandid,
                Brandname = b.Brandname
            }).ToList();
        }
        public bool CreateBrand(Brandvehicle brand)
        {
            try
            {
                db.Brandvehicles.Add(brand);
                return db.SaveChanges() > 0;
            }
            catch
            {

                return false;
            }
        }
        public bool UpdateBrand(Brandvehicle brand)
        {
            try
            {
                db.Entry(brand).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;

            }
        }

        public dynamic findById(int id)
        {
            return db.Brandvehicles.Where(b => b.Brandid == id)
                .Select(b => new
            {
                Brandid = b.Brandid,
                Brandname = b.Brandname
            }).FirstOrDefault();
        }
    }
}
