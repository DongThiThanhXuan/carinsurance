using BackEnd.Models;

namespace BackEnd.Services
{
    public interface EstimateService
    {

        //---------------Phat code
        public dynamic findEstimateByid(int estimateid);

        //-------------Phat code------------------
        public dynamic countEstimate();
        public dynamic findAllContract();

        //--------------------------------------
        //------------------Phat code-----------
        public dynamic findAll();
        public dynamic findAllEstimateByAccount(int accountId);
        public bool UpdateEstimate(int id);
        public dynamic createEstimate(Estimate estimate);

        //-------------------------------------
    }
}
