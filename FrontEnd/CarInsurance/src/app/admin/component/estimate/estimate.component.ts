import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { SortEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { Brandvehicle } from 'src/app/models/brandvehicle.model';
import { Estimate } from 'src/app/models/estimate.model';
import { Policy } from 'src/app/models/policy.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AccountService } from 'src/app/services/account.service';
import { BrandvehicleService } from 'src/app/services/brandvehicle.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { PolicyService } from 'src/app/services/policy.service';
import { Validation } from 'src/app/services/validation.service';
import { VehicleService } from 'src/app/services/vehicle.service';
@Component({
  templateUrl: './estimate.component.html',
})
export class EstimateComponent implements OnInit {
 first = 0;
  rows = 10;
 nameCar:any;
  listEstimate: any = null
  
  listPolicies:any 
  listCar:any
  myMap = new Map<number, String>()
  myMap2 = new Map<number, String>()
  constructor(
    private estimateService: EstimateService,
    private policyService: PolicyService,
    private vehicleService: VehicleService,
    private accountService: AccountService
  ) {

  }
  
  ngOnInit(): void {

  this.getEstimate()
  this.getPoliciesandCar()
  this.getNameAccount()
  }

  getNameAccount(){
    this.accountService.findAll().then(res=>{
        var accounts = res as Account[];
        accounts.forEach(x=>{
          this.myMap2.set(x.accountid,x.accountname);
        })
    })
    console.log(this.myMap2)
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
  if(this.listPolicies!=null){
  this.listPolicies.forEach(y=>{
    this.listCar.filter(x=>y.vehicleid==x.vehicleid).forEach(x=>{
      var namecar =""
      namecar=x.brand+"-"+x.vehiclemodel+"-"+x.yearofmanufacture+"-"+x.vehicleversion
      this.myMap.set(y.policyid,namecar)
    }
     )
  })
  }
  console.log(this.myMap)
  
}
getEstimate(){
  this.estimateService.findAllEstimate().then(res=>{
    this.listEstimate = res as Estimate[]
    console.log(res)
  })  
}
}
 