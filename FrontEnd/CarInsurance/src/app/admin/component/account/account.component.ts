import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { AccountService } from 'src/app/services/account.service';
import { Validation } from 'src/app/services/validation.service';
@Component({
  selector: 'account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  listaccount: Account[];
  accounts: Account[]
  checkaccount: Account[]
  getaccount: Account
  getAccountId: number
  selectaccount: Account
  newsNull: Account[]
  first = 0;
  rows = 10;
  username:string;
  addAccountForm: FormGroup;
  editAccountForm: FormGroup;
  accountDialog: boolean;
  editAccountDialog: boolean;
  dialogInfo: string;
  displayDialog: boolean;
  loadingDialog: boolean;
  errorPerId: string;
  errorName: string;
  errorPhone: string;
  errorEmail: string;
  //@ViewChild('dt') table: Table;

  activityValues: number[] = [0, 100];
  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private validation: Validation,
    private cdref: ChangeDetectorRef
  ) {

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(){
   this.listaccount=null;
    this.accountService.findAllCustomer().then(
      res => {
        this.listaccount = res as Account[];
      },
      err => {
        console.log(err)
      }
    );
    this.accountService.findAll().then(
      res => {
        this.accounts = res as Account[];
      },
      err => {
        console.log(err)
      }
    );
  }

  confirm1(account: Account) {
    var accId = account.accountid
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log("accId: " +accId)
            this.accountService.updateStatus(accId, 0).then(
                res =>{
                    var stt = res as number;
                    if(stt != null){
                      this.reload();
                      this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Account locked!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}


confirm2(account: Account) {
    var accId = account.accountid
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log("accId: " +accId)
            this.accountService.updateStatus(accId, 1).then(
                res =>{
                    var stt = res as number;
                    if(stt != null){
                      this.reload();
                      this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Account unclock!'});
                      console.log('OK');
                    } else{
                        console.log('Fail');
                    } 
               },
               err =>{
                    console.log(err);
               });
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}

openAddAcc(){
    this.accountDialog = true;
    this.errorName = "";
    this.errorPerId = "";
    this.errorEmail ="";
    this.errorPhone = "";
    this.addAccountForm = this.formBuilder.group({
      personid: '',
      accountemail: '',
      passwords: '',
      accountname: '',
      accountadd: '',
      accountphone: '',
      roles: 'customer',
      accountstatus: 1
    });
}

save1(){
    var account: Account = this.addAccountForm.value;
    account.personid = account.personid.trim();
    account.accountemail = account.accountemail.trim();
    account.accountname = account.accountname.trim();
    account.accountadd = account.accountadd.trim();
    account.accountphone = account.accountphone.trim();
    this.errorPerId = this.validation.checkPersonId(account.personid, this.accounts);
    this.errorEmail = this.validation.checkEmail(account.accountemail, this.accounts);
    this.errorName = this.validation.checkFullname(account.accountname);
    this.errorPhone = this.validation.checkPhone(account.accountphone);
    console.log("phone: " + account.accountphone)
    console.log("add: " + account.accountadd)
    if (this.errorPerId === "" && this.errorEmail === "" && this.errorPhone === "" && this.errorName === "") {
      this.loadingDialog = true; 
      this.accountService.createAccount(account).then(
        res => {
          var re: ResultAPI = res as ResultAPI;
          if (re.result) {
            this.dialogInfo = "A new account has been created!";
            this.addAccountForm = this.formBuilder.group({
              personid: '',
              accountemail: '',
              passwords: '',
              accountname: '',
              accountadd: '',
              accountphone: '',
              roles: 'customer',
              accountstatus: 1
            });
            this.reload();
            this.accountDialog = false;
          } else {
            this.dialogInfo = "Create a new account fail!";
          }
          this.loadingDialog = false;
        }
        , err => {
          this.loadingDialog = false;
          this.displayDialog = true;
          this.dialogInfo = "Failed";
          console.log(err);
        }
      )
    }

}

openUpdate(account: Account){
  this.editAccountDialog = true;
  this.errorName = "";
  this.errorPerId = "";
  this.errorEmail ="";
  this.errorPhone = "";
  this.editAccountForm = this.formBuilder.group({
    accountid: account.accountid,
    personid: account.personid,
    passwords: account.passwords,
    accountname: account.accountname,
    accountemail: account.accountemail,
    accountadd: account.accountadd,
    accountphone: account.accountphone,
    roles: account.roles,
    accountstatus: account.accountstatus
  });
}

save2(){
  this.getaccount = this.editAccountForm.value;
  this.getAccountId = this.getaccount.accountid;
  this.accountService.findById(this.getAccountId).then(
    trueresult =>{  
      this.selectaccount = trueresult as Account;
       if(this.getaccount.personid.trim() == this.selectaccount.personid.trim() && this.getaccount.accountname.trim() == this.selectaccount.accountname.trim() 
        && this.getaccount.accountemail.trim() == this.selectaccount.accountemail.trim() && this.getaccount.accountadd == this.selectaccount.accountadd
        && this.getaccount.accountphone == this.selectaccount.accountphone){
          this.errorName = "";
          this.errorPerId = "";
          this.errorEmail ="";
          this.errorPhone = "";
          this.showWarn();
      }
    else{  
    this.getaccount.personid = this.getaccount.personid.trim();
    this.getaccount.accountemail = this.getaccount.accountemail.trim();
    this.getaccount.accountname = this.getaccount.accountname.trim();
    this.getaccount.accountadd = this.getaccount.accountadd.trim();
    this.getaccount.accountphone = this.getaccount.accountphone.trim();
    this.checkaccount=null;
    this.accountService.findListNotContain(this.getAccountId).then(
      res => {
        this.checkaccount = res as Account[];
        this.errorPerId = this.validation.checkPersonId(this.getaccount.personid, this.checkaccount);
        this.errorEmail = this.validation.checkEmail(this.getaccount.accountemail, this.checkaccount);
        this.errorName = this.validation.checkFullname(this.getaccount.accountname);
        this.errorPhone = this.validation.checkPhone(this.getaccount.accountphone);
        if (this.errorPerId === "" && this.errorEmail === "" && this.errorPhone === "" && this.errorName === "") {
          this.accountService.checkInsuranceExp(this.getAccountId).then(
            res =>{
              var re: ResultAPI = res as ResultAPI;
              console.log("res: " + re.result)
              if (re.result) {
                console.log("pass: " + this.getaccount.passwords);
                console.log("role: " + this.getaccount.roles);
                if(this.getaccount.accountadd != this.selectaccount.accountadd && this.getaccount.accountphone != this.selectaccount.accountphone 
                   && this.getaccount.accountemail != this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                   && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                } else if(this.getaccount.accountadd != this.selectaccount.accountadd && this.getaccount.accountphone == this.selectaccount.accountphone &&
                  this.getaccount.accountemail == this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                  && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                 } else if(this.getaccount.accountadd != this.selectaccount.accountadd && this.getaccount.accountphone != this.selectaccount.accountphone &&
                  this.getaccount.accountemail == this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                  && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                }

                else if(this.getaccount.accountadd == this.selectaccount.accountadd && this.getaccount.accountphone != this.selectaccount.accountphone &&
                  this.getaccount.accountemail == this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                  && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                }

                else if(this.getaccount.accountadd == this.selectaccount.accountadd && this.getaccount.accountphone == this.selectaccount.accountphone &&
                  this.getaccount.accountemail != this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                  && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                }

                else if(this.getaccount.accountadd != this.selectaccount.accountadd && this.getaccount.accountphone == this.selectaccount.accountphone &&
                  this.getaccount.accountemail != this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                  && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                }

                else if(this.getaccount.accountadd == this.selectaccount.accountadd && this.getaccount.accountphone != this.selectaccount.accountphone &&
                  this.getaccount.accountemail != this.selectaccount.accountemail && this.getaccount.personid == this.selectaccount.personid
                  && this.getaccount.accountname == this.selectaccount.accountname){
                  this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
                  this.loadingDialog = false;
                }
                , err => {
                    this.loadingDialog = false;
                    this.displayDialog = true;
                    this.dialogInfo = "Failed";
                    console.log(err);
                })
                }
                
          
                else {
                  this.showWarn1();
                  this.editAccountForm = this.formBuilder.group({
                    accountid: this.selectaccount.accountid,
                    personid: this.selectaccount.personid,
                    passwords: this.selectaccount.passwords,
                    accountname: this.selectaccount.accountname,
                    accountemail: this.getaccount.accountemail,
                    accountadd: this.getaccount.accountadd,
                    accountphone: this.getaccount.accountphone,
                    roles: this.selectaccount.roles,
                    accountstatus: this.selectaccount.accountstatus
                  });
                }
             
            }
            else{
              this.loadingDialog = true;
              this.accountService.updateAccount(this.getaccount).then(
                    res => {
                    var re: ResultAPI = res as ResultAPI;
                    if (re.result) {
                      this.dialogInfo = "Update account success!";
                      this.reload();
                      this.editAccountDialog = false;
                    } else {
                      this.dialogInfo = "Update fail!";
                    }
            this.loadingDialog = false;
          }
          , err => {
            this.loadingDialog = false;
            this.displayDialog = true;
            this.dialogInfo = "Failed";
            console.log(err);
          })
            }
            }, err => {
              this.loadingDialog = false;
              this.displayDialog = true;
              this.dialogInfo = "Failed";
              console.log(err);
            }
          )      
        }
      },
      err => {
        console.log(err)
      }
    );    
  }
    },
    erros=>{
      console.log(erros);
    }); 

}
showWarn() {
  this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Account inforamtion has not changed!'});
}

showWarn1() {
  this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Can not update person Id and Name information!'});
}

next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.listaccount ? this.first === (this.listaccount.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listaccount ? this.first === 0 : true;
}
}
 