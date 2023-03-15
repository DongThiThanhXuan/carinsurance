import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from 'src/app/models/account.model';
import { LoginModel } from 'src/app/models/login.model';
import { Result } from 'src/app/models/result.model';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { Validation } from 'src/app/services/validation.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  email: string;
  password: string;
  roles: string;
  loginDetail: LoginModel;
  accounts: Account[];
  addAccountForm: FormGroup;
  displayModalLogin: boolean;
  showloading: boolean;
  displayModalLoginTitle: string;
  checkInvlalidPassTime: boolean;


  repass:string;
  errorRePass:string;
  errorPass:string;
  errorEmail:string;
  errorName:string;
  errorpersonid:string;
  displayModalRegister: boolean;
  displayModalRegisterTitle:string;
  checkclick:number;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router, 
    private validation: Validation,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
 
    if (localStorage.getItem("role") != null || localStorage.getItem("role") === "") {
      if (window.location.toString() == "http://localhost:4200/login-register") {
        switch (localStorage.getItem("role").trim()) {
          case 'admin':
            this.router.navigate(['/admin'])
            break;
          case 'customer':

            this.router.navigate(['/home']);
            break;

        }

      } else {
        window.location.reload();
      }
    }
      this.checkclick=0;
      this.email = "";
      this.password = "";
      this.loginDetail = new LoginModel;
      this.accountService.findAll().then(
        res => {
          this.accounts = res as Account[];
        },
        err => {
          console.log(err);
        }
  
      );
      this.repass= "";
      this.errorRePass= "";
      this.errorPass= "";
      this.errorEmail= "";
      this.errorpersonid= "";
      this.errorName ="";
  
      this.addAccountForm = this.formBuilder.group({
        accountid: 0,
        personid:'',
        accountemail:'',
        passwords: '',
        accountname: '',
        accountadd: '',
        accountphone: '',
        roles: 'customer',
        accountstatus: 1
      });
  }

  login() {
   this.showloading=true;
    this.loginDetail.email = this.email;
    this.loginDetail.password = this.password;

    
    this.loginService.checkLogin(this.loginDetail).then(
      res => {

        var token = res as string;
        console.log(token);
        if (token == "Invalid credentials") {
          this.displayModalLoginTitle = "Wrong email or password";
          this.showloading=false;
          this.displayModalLogin=true;
        } else {          
          localStorage.setItem("jwt", token);
          var decodedToken = this.jwtHelper.decodeToken(token);

          // var expirationDate = this.jwtHelper.getTokenExpirationDate(token);
          // var isExpired = this.jwtHelper.isTokenExpired(token);
          var status = decodedToken.Status;
          
          if (status == 0) {
            this.displayModalLoginTitle = "Account not activated";
            this.showloading=false;
            this.displayModalLogin=true;
          } else {
            this.showloading=false;
            localStorage.setItem("accountid", decodedToken.Accountid);
            localStorage.setItem("role", decodedToken.Role.trim());
            localStorage.setItem("status", status);

            var ro = localStorage.getItem("role");
            switch (ro.toString().trim()) {

              case 'admin':
                this.router.navigate(['/admin'])
                break;
              default:
                this.router.navigate(['/home']);
                break;
            }
          }
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  closedisplayModalLogin() {
    this.displayModalLogin = false;
  }

  register(){
    var account: Account = this.addAccountForm.value;
    
      this.errorPass= this.validation.checkPass(account.passwords);
      this.errorEmail=  this.validation.checkEmail(account.accountemail, this.accounts);
      this.errorpersonid= this.validation.checkPersonId(account.personid, this.accounts);
      this.errorRePass=  account.passwords === this.repass ? "" : "Re-Password not match";
      this.errorName = this.validation.checkFullname(account.accountname);
      account.personid = account.personid.trim();
      account.accountname = account.accountname.trim();
      account.accountemail = account.accountemail.trim();
      account.passwords = account.passwords.trim();
      if( this.errorPass=="" && this.errorEmail=="" && this.errorpersonid=="" && this.errorRePass=="" && this.errorName =="" ){
        this.showloading=true;
        this.accountService.createAccount2(account).then(
          res => { 
            var re: Result = res as Result;
            console.log(re);
            if (re) {              
              this.showloading=false;
              this.displayModalRegisterTitle = "Success! Kindly Login to buy issuarance";
              this.displayModalRegister=true;
              this.repass = "";
              this.addAccountForm = this.formBuilder.group({
                accountid: 0,
                personid:'',
                accountemail:'',
                passwords: '',
                accountname: '',
                accountadd: '',
                accountphone: '',
                roles: 'customer',
                accountstatus: 1
              });
              this.showloading = false;
            } else {
              this.showloading=false;
              this.displayModalRegisterTitle = "Failed";
              this.displayModalRegister=true;
            }
          }
          , err => {
            this.showloading=false;
            this.displayModalRegister = true;
            this.displayModalRegisterTitle = "Failed";
            console.log(err);
          }
        )
      }
  }

  closedisplayModalRegister() {
    this.displayModalRegister = false;
    window.location.reload();
  }





}
