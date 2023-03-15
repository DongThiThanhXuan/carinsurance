using BackEnd.Models;

namespace BackEnd.Services
{
    public interface VehicleService
    {

        //---------------Phat code
        public dynamic showByid(int vehicleid);

        //-------------Phat code------------------
        public dynamic findAllVehicle();
        public dynamic countVehicle();
        public bool CheckEditVehicle(int id, int brand, string model, string version, int year);
        public bool CreateVehicle(Vehicle vehicle);
        public bool UpdateVehicle(Vehicle vehicle);
        public bool CheckExistVehicle(int brand, string model, string version, int year);

        //--------------------------------------
        //------------------Phat code-----------


        //-------------------------------------
    }
}
