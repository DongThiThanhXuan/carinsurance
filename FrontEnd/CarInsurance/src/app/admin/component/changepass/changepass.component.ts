import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { ChangePassModel } from 'src/app/models/changePass.model';

import { LoginModel } from 'src/app/models/login.model';
import { Result } from 'src/app/models/result.model';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { Validation } from 'src/app/services/validation.service';

@Component({
  templateUrl: './changepass.component.html',
})
export class ChangePassComponent implements OnInit {
  
  changePassForm: FormGroup;
  account: Account
  errorPass: string;
  errorNewPass: string;
  errorReNewPass: string;

  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService, 
    private loginService: LoginService, 
    private validation: Validation, 
    private messageService: MessageService
  ) {
 }

  ngOnInit(): void {
    this.changePassForm = this.formBuilder.group({
      password: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  changePass() {
    var change: ChangePassModel = this.changePassForm.value;
    var login: LoginModel = {
      email: '',
      password: ''
    };
    if(change.password == '' || change.newPassword == '' || change.confirmPassword == ''){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please, fill all blank fields!' })
    }
    else{
      var accId = localStorage.getItem('accountid');
      this.accountService.findById(parseInt(accId)).then(
        res => {
          var getAcc = res as Account
          console.log("mail: " + getAcc.accountemail)
          login.email = getAcc.accountemail,
          login.password = change.password,
          this.loginService.checkLogin(login).then(
            res => {
              var token = res as string;
              this.errorNewPass = this.validation.checkPass(change.newPassword);
              this.errorReNewPass = change.confirmPassword == change.newPassword ? "" : "Confirm Password not match";
              if (token == "Invalid credentials") {
                this.errorPass = "Wrong Password";
              } else {
                this.errorPass = "";
                if (this.errorPass == "" && this.errorNewPass == "" && this.errorReNewPass == "") {
                  login.password = change.newPassword;
                  this.accountService.changePassword(login).then(
                    res => {
                      var re = res as Result;
                      if (re.result) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Change password Success' });
                        this.changePassForm = this.formBuilder.group({
                          password: '',
                          newPassword: '',
                          confirmPassword: ''
                        })
                      } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
                      }
      
                    }, err => { 
                      console.log(err);
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' }); 
                    }
                  );
                }
              }
      
            }
          );
      
        },
        err =>{
          console.log(err); 
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
        }
      )
    }
  }
}
 