using BackEnd.Helpers;
using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Services
{
    public class AccountServiceImpl : AccountService
    {
        private DatabaseContext db;
        private static Random random = new Random();
        private IConfiguration configuration;
        public AccountServiceImpl(DatabaseContext _db, IConfiguration _configuration)
        {
            db = _db;
            configuration = _configuration;
        }
        //--------------------------Phat code--------------------------------
        public bool CheckDuplicatePersonId(string personid)
        {
            var e = db.Accounts.FirstOrDefault(x => x.Personid == personid);
            return e != null;
        }

        public bool CheckDuplicateEmail(string accountemail)
        {
            var e = db.Accounts.FirstOrDefault(x => x.Accountemail == accountemail);
            return e != null;
        }

        public dynamic Login(string accountemail, string password)
        {
            var acc = db.Accounts.SingleOrDefault(s => s.Accountemail.ToLower() == accountemail.ToLower().Trim());
            if (acc != null)
            {
                if (BCrypt.Net.BCrypt.Verify(password, acc.Passwords))
                {
                    return new
                    {
                        Accountid = acc.Accountid,
                        Roles = acc.Roles,
                        Accountstatus = acc.Accountstatus

                    };
                }
            }

            return null;
        }



     

        public dynamic FindByEmail(string email)
        {
            return db.Accounts.Where(s => s.Accountemail == email).Select(a => new
            {
                Accountid = a.Accountid,
                Accountemail = a.Accountemail,
                Password = a.Passwords,
                Accountstatus = a.Accountstatus
            }).FirstOrDefault();
        }
        public bool CreateAccount2(Account account)
        {
            try
            {

                string message = $"<html>" +
                    $"<body>" +
                    $"<h2>Welcome to Car Insurance</h2>" +
                    $"<h5>Account Information</h5>" +
                    $"<p>Username : {account.Accountemail}</p>" +
                    $"<p>Fullname : {account.Accountname}</p>" +
                    $"<p>Kindly login then update your phone and your address" +
                    
                    $"<strong>This email has been create accout in our website</strong>" +
                    $"<br>" +
                    $"<br>" +
                    $"<em>Thanks and Best Regards!</em>" +
                    $"</body>" +
                    $"</html>";
                account.Passwords = BCrypt.Net.BCrypt.HashPassword(account.Passwords);
                db.Accounts.Add(account);
                if (db.SaveChanges() > 0)
                {
                    SendMailHelper.SendMailVerify(account.Accountemail, message, "Welcome!!");
                    return true;
                }
                else { return false; }
            }
            catch
            {
                return false;

            }
        }

        //-----------------------Phat code-------------------------

        public dynamic findAll()
        {
            return db.Accounts.Select(a => new
            {
                Accountid = a.Accountid,
                Personid = a.Personid,
                Accountemail = a.Accountemail,
                Passwords = a.Passwords,
                Accountname = a.Accountname,
                Accountadd = a.Accountadd,
                Accountphone = a.Accountphone,
                Accountstatus = a.Accountstatus,
                Roles = a.Roles
            }).ToList();
        }

        public dynamic findAllCustomer()
        {
            return db.Accounts.Where(a => a.Roles.Equals("customer"))
                .Select(a => new
                {
                    Accountid = a.Accountid,
                    Personid = a.Personid,
                    Accountemail = a.Accountemail,
                    Passwords = a.Passwords,
                    Accountname = a.Accountname,
                    Accountadd = a.Accountadd,
                    Accountphone = a.Accountphone,
                    Accountstatus = a.Accountstatus,
                    Roles = a.Roles
                }).ToList();
        }

        public bool UpdateAccount(Account account)
        {
            try
            {
                string message = $"<html>" +
                   $"<body>" +
                   $"<h2>Update account infomation</h2>" +
                   $"<h5>New account Information</h5>" +
                   $"<p>Username : {account.Accountemail}</p>" +
                   $"<p>Fullname : {account.Accountname}</p>" +
                   $"<p>Phone: {account.Accountphone} </p>" +
                   $"<p>Address: {account.Accountadd}</p>" +
                   $"<br>" +
                   $"<em>Thanks and Best Regards!</em>" +
                   $"</body>" +
                   $"</html>";
                db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                if (db.SaveChanges() > 0)
                {
                    SendMailHelper.SendMailVerify(account.Accountemail, message, "Update information!");
                    return true;
                }
                else { return false; }
            }
            catch
            {
                return false;

            }
        }

        public bool ChangePass(ChangePass changePass)
        {
            try
            {
                var user = db.Accounts.FirstOrDefault(s => s.Accountemail.ToLower() == changePass.Email.ToLower());
                user.Passwords = BCrypt.Net.BCrypt.HashPassword(changePass.Password);
                db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateStatus(int id, byte status)
        {
            try
            {
                var acc = db.Accounts.FirstOrDefault(a => a.Accountid == id);
                if (acc != null)
                {
                    acc.Accountstatus = status;
                    return db.SaveChanges() > 0;
                }
                return false;
            }
            catch
            {

                return false;
            }
        }

        public bool CreateAccount(Account account)
        {
            try
            {
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var verifyCode = new string(Enumerable.Repeat(chars, 20)
                   .Select(s => s[random.Next(s.Length)]).ToArray());
                account.Passwords = verifyCode;
                account.Passwords = BCrypt.Net.BCrypt.HashPassword(verifyCode);
                string message = $"<html>" +
                    $"<body>" +
                    $"<h2>Welcome to Car Insurance</h2>" +
                    $"<h5>Account Information</h5>" +
                    $"<p>Username : {account.Accountemail}</p>" +
                    $"<p>Password : {verifyCode}</p>" +
                    $"<p>Fullname : {account.Accountname}</p>" +
                    $"<p>Phone: {account.Accountphone}</p>" +
                    $"<p>Address: {account.Accountadd}</p>" +
                    $"<strong>Please, change your password after login!</strong>" +
                    $"<br>" +
                    $"<br>" +
                    $"<em>Thanks and Best Regards!</em>" +
                    $"</body>" +
                    $"</html>";
                db.Accounts.Add(account);
                if (db.SaveChanges() > 0)
                {
                    SendMailHelper.SendMailVerify(account.Accountemail, message, "Welcome!!");
                    return true;
                }
                else { return false; }
            }
            catch
            {
                return false;

            }
        }

        public dynamic findById(int id)
        {
            return db.Accounts.Where(a => a.Accountid == id)
                .Select(a => new
                {
                    Accountid = a.Accountid,
                    Personid = a.Personid,
                    Accountemail = a.Accountemail,
                    Passwords = a.Passwords,
                    Accountname = a.Accountname,
                    Accountadd = a.Accountadd,
                    Accountphone = a.Accountphone,
                    Accountstatus = a.Accountstatus,
                    Roles = a.Roles
                }).FirstOrDefault();
        }

        public bool CheckInsuranceExp(int id)
        {
            var selectAcc = db.Accounts.FirstOrDefault(a => a.Accountid == id);
            var result = selectAcc.Estimates.FirstOrDefault(e => e.Expirationdate > DateTime.Now);
            return result != null;
        }

        public dynamic FindListNotContain(int id)
        {
            return db.Accounts.Where(a => a.Accountid != id)
                .Select(a => new
                {
                    Accountid = a.Accountid,
                    Personid = a.Personid,
                    Accountemail = a.Accountemail,
                    Password = a.Passwords,
                    Accountname = a.Accountname,
                    Accountadd = a.Accountadd,
                    Accountphone = a.Accountphone,
                    Accountstatus = a.Accountstatus
                }).ToList();
        }
        // -- Phat code

    }
}
