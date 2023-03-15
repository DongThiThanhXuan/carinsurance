using BackEnd.Models;

namespace BackEnd.Services
{
    public interface AccountService
    {

        //---------------Phat code-----------------

        public dynamic Login(string email, string password);
     
       
        public bool CheckDuplicatePersonId(string personid);
        public bool CheckDuplicateEmail(string accountemail);
        public dynamic FindByEmail(string email);
        public bool CreateAccount2(Account account);

        //-------------Phat code------------------
        public dynamic findAll();
        public dynamic findAllCustomer();
        public dynamic findById(int id);
        public bool UpdateAccount(Account account);
        public bool ChangePass(ChangePass changePass);
        public bool UpdateStatus(int id, byte status);
        public bool CreateAccount(Account account);
        public bool CheckInsuranceExp(int id);
        public dynamic FindListNotContain(int id);
        //--------------------------------------
        //------------------Phat code-----------


        //-------------------------------------
    }
}
