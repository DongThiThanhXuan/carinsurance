using BackEnd.Models;

namespace BackEnd.Services
{
    public interface PolicyService
    {

        //---------------Phat code

        public dynamic FindPolicy(int policyid);
        public dynamic findAllPolicy();
        public bool CreatePolicy(Policy policy);
        public bool UpdatePolicy(Policy policy);

        //-------------Phat code------------------



        //--------------------------------------
        //------------------Phat code-----------
        public dynamic findAllPolicyD();

        //-------------------------------------
    }
}
