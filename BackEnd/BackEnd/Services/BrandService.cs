using BackEnd.Models;

namespace BackEnd.Services
{
    public interface BrandService
    {

        //---------------Phat code


        //-------------Phat code------------------
        public dynamic findAllBrand();
        public dynamic findById(int id);
        public bool CreateBrand(Brandvehicle brand);
        public bool UpdateBrand(Brandvehicle brand);

        //--------------------------------------
        //------------------Phat code-----------


        //-------------------------------------
    }
}
