import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { ChangePassWordComponent } from './changePassword/changepass.component';
import { UpdateProfileComponent } from './updateProfile/update.component';
import { SortEvent } from 'primeng/api';
import { EstimateService } from 'src/app/services/estimate.service';
import { Estimate } from 'src/app/models/estimate.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/models/policy.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { EstimateL } from 'src/app/models/estimateL.model';
@Component({
  selector: 'app-home-three',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 accountCustomer:Account=null
 @ViewChild(ChangePassWordComponent) changePass:ChangePassWordComponent;
  @ViewChild(UpdateProfileComponent) updateForm:UpdateProfileComponent;
  estimate:EstimateL;
  constructor(
    private accountService: AccountService,
    private estimateService: EstimateService,
    private policyService: PolicyService,
    private vehicleService: VehicleService
    ) { }
  nameCar:any;
  listEstimate: any = null;
  accountId:any = 1;
  listPolicies:any ;
  listCar:any;
  display:boolean;
  myMap = new Map<number, String>()
  ngOnInit(): void {
this.getPoliciesandCar()
this.getAccountCustomer()
this.getEstimate()

  }
getAccountCustomer(){
      this.accountId = +localStorage.getItem("accountid")
     this.accountService.findById(this.accountId).then(res=>{
      this.accountCustomer = res as Account
     })

}
getPoliciesandCar(){
  this.policyService.findAllPolicy().then(res=>{
    this.listPolicies = res as Policy[]
    this.vehicleService.findAllVehicle().then(res=>{
    this.listCar = res as Vehicle[]
    this.getNameCar()
  })
  })
  
}
 getNameCar(){
  this.listPolicies.forEach(y=>{
    this.listCar.filter(x=>y.vehicleid==x.vehicleid).forEach(x=>{
      var namecar =""
      namecar=x.brand+"-"+x.vehiclemodel+"-"+x.yearofmanufacture+"-"+x.vehicleversion
      this.myMap.set(y.policyid,namecar)
    }
     )
  })
  console.log(this.myMap)
  
}
getEstimate(){
  this.estimateService.findAllEstimateById(this.accountId).then(res=>{
    this.listEstimate = res as Estimate[]
    console.log(res)

  })
    
  
  }
openEditForm(){
    this.updateForm.openPopup()
  }
openChangePassword(){
    this.changePass.openPopup()
  }

  //Table
customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }
    showEdit(estimateid:number){
      this.estimateService.findEstimateByid(estimateid).then(res=>{
        this.estimate = res as EstimateL
    
      })
    this.display=true;
    
    }
}
