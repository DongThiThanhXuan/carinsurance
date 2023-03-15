import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.scss']
})
export class AdminSideBarComponent implements OnInit {

   items: MenuItem[];
   account: Account
   getName: string
   getAccId: string

  constructor(
    private accountService: AccountService
  ) {
   
  }

  ngOnInit(): void {
   this.getAccId=localStorage.getItem("accountid");
   this.accountService.findById(parseInt(this.getAccId)).then(
   trueresult =>{         
     this.account = trueresult as Account;
     console.log("acc: " + this.account.accountname)
   },
   erros=>{
     console.log(erros);
   }        
 );
   this.items = [
      {
         label:'Dashboard',
         icon:'pi pi-fw pi-th-large',
         routerLink:"/admin/dashboard"
      },
      {
         label:'Account',
         icon:'pi pi-fw pi-users',
         routerLink:"/admin/account"
      },
      {
         label:'Polycies',
         icon:'pi pi-fw pi-book',
         routerLink:"/admin/policy"
      },
      {
         label:'Contract',
         icon:'pi pi-fw pi-file',
         routerLink:"/admin/contract"
      },
      {
         label:'Vehicle',
         icon:'pi pi-fw pi-car',
         routerLink:"/admin/vehicle"
      },
      {
         label:'Brand vehicle',
         icon:'pi pi-fw pi-bookmark',
         routerLink:"/admin/brand"
      },
      {
         label:'My profile',
         icon:'pi pi-fw pi-user',
         routerLink:"/admin/profile"
      },
      {
        label:'Change Password',
        icon:'nav-icon fas fa-user-edit',
        routerLink:"/admin/changepass",
      },
      {
         label:'Logout',
         icon:'pi pi-fw pi-sign-out',
         routerLink:"/logout",
      }
  ];
  }

}
 