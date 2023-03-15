import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { AccountService } from 'src/app/services/account.service';
import { Validation } from 'src/app/services/validation.service';
@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  accounts: Account[];
  
  selectaccount: Account
  accountid: number;
  account:Account;
  oldaccout:Account;
  editAccountForm: FormGroup;
  checkaccount: Account[];
  errorPerId: string;
  errorName: string;
  errorPhone: string;
  errorEmail: string;
  loadingDialog: boolean

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private validation: Validation,
    private router: Router) {

  }
 
  ngOnInit(): void {
    this.accountService.findAll().then(
      res => {
        this.accounts = res as Account[];
      },
      err => {
        console.log(err);
      }

    );
    this.reload()
  }

  reload(){
    this.accountid = parseInt(localStorage.getItem("accountid"));
    this.accountService.findById(this.accountid).then(
    trueresult =>{         
      this.account= trueresult as Account;
      this.editAccountForm = this.formBuilder.group({
        accountid: this.account.accountid,
        personid: this.account.personid,
        passwords: this.account.passwords,
        accountname: this.account.accountname,
        accountemail: this.account.accountemail,
        accountadd: this.account.accountadd,
        accountphone: this.account.accountphone,
        roles: this.account.roles,
        accountstatus: this.account.accountstatus
   })
           
    },
    erros=>{
      console.log(erros);
    });
  }

  save(){
    this.account = this.editAccountForm.value;
      this.accountid = this.account.accountid;
      this.accountService.findById(this.accountid).then(
        res => {
          this.selectaccount = res as Account;
          console.log("select: " + this.selectaccount.accountid)
          console.log("get: " + this.account.accountid)

       if(this.account.personid.trim() == this.selectaccount.personid.trim() && this.account.accountname.trim() == this.selectaccount.accountname.trim() 
        && this.account.accountadd == this.selectaccount.accountadd && this.account.accountphone == this.selectaccount.accountphone){
          this.showWarn();
        }else{
          this.loadingDialog = true; 
          this.account.personid = this.account.personid.trim();
          // this.account.accountemail = this.account.accountemail.trim();
          this.account.accountname = this.account.accountname.trim();
          this.account.accountadd = this.account.accountadd.trim();
          this.account.accountphone = this.account.accountphone.trim();

          this.errorPerId = this.validation.checkPersonId(this.account.personid, this.accounts);
          this.errorEmail = this.validation.checkEmail(this.account.accountemail, this.accounts);
          // this.errorName = this.validation.checkFullname(this.account.accountname);
          this.errorPhone = this.validation.checkPhone(this.account.accountphone);

          this.checkaccount=null;
          this.accountService.findListNotContain(this.accountid).then(
            res => {
              this.checkaccount = res as Account[];
              this.errorPerId = this.validation.checkPersonId(this.account.personid, this.checkaccount);
              // this.errorEmail = this.validation.checkEmail(this.account.accountemail, this.checkaccount);
              this.errorName = this.validation.checkFullname(this.account.accountname);
              this.errorPhone = this.validation.checkPhone(this.account.accountphone);
              if (this.errorPerId === "" && this.errorPhone === "" && this.errorName === "") {
                this.accountService.updateAccount(this.account).then(
                  res => {
                  var re: ResultAPI = res as ResultAPI;
                  if (re.result) {
                    this.reload();
                    this.showSuccess();
                  } else {
                    this.showError();
                  }
                  this.loadingDialog = false; 
        }
        , err => {
          console.log(err);
        })
              }
            },
          erros=>{
            console.log(erros);
          });
        }

        },
        erros=>{
          console.log(erros);
        });  
    
  }

  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Account information has not changed!'});
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Account information update success!'});
}
showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Account information fail!'});
}

}
 