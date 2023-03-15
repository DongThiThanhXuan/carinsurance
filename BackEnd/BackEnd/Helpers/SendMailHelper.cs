using System.Net;
using System.Net.Mail;

namespace BackEnd.Helpers
{
    public class SendMailHelper
    {
        public static async Task SendMailVerify(string toMail, string body, string subject)
        {
            var mess = new MailMessage();
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.Timeout = 100 * 100;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("infinite.rating.hcm@gmail.com", "dndbmjgasfrysyga");
                mess.From = new MailAddress("infinite.rating.hcm@gmail.com", "Car Insurance");
                mess.Body = body;
                mess.Subject = subject;
                mess.IsBodyHtml = true;
                mess.Priority = MailPriority.Normal;
                mess.To.Add(toMail);
                smtpClient.Send(mess);
            }
            catch (Exception ex)
            {
                return;
            }
        }
     
    }
}
