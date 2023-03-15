import { Component, Injectable, OnInit,Inject, Output, EventEmitter, ViewChild } from '@angular/core';

import { DOCUMENT,DatePipe  } from '@angular/common';
import { Account } from 'src/app/models/account.model';
import { Policy } from 'src/app/models/policy.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import {MessageService} from 'primeng/api';
import { BuyInsuranceComponent } from '../buy-insurance.component';

@Component({
  selector: 'preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {
  @ViewChild('agree1') input;
  @ViewChild('agree2') input1;
   @Output() buttonClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  statusPopup:any = false;
  accountCustomer:Account = null;
  carNumber:any = ""
  bodyNumber:any = ""
  duration:any=""
  nameCar:any = ""
  carPick:Vehicle = null
  policyPick:Policy = null
  currentYear:number
  expirationDate:any
  dateExpire:any =""
  dateExpire1:any =""
  marketValue:number = 0
  estimateValue:number = 0
  insuranceFeeValue:number = 0
  theft: number
  accident: number
  body: number
  engine: number
  flood: number
  constructor(@Inject(DOCUMENT) private document: Document,
  private datePipe: DatePipe,
  private messageService: MessageService,
  private Parent:BuyInsuranceComponent) { }

  ngOnInit(): void {
  this.currentYear = new Date().getFullYear();
  this.expirationDate =  new Date();

  }
   keyUpClose(){
    document.onkeyup = function (e) {
     if (e.key === "Escape") {
     document.querySelector("body").classList.remove("showPopup");
  document.querySelector("body").classList.remove("removePopup");
  }
}
  }
  openPopup(e:any,carNumber:any,bodyNumber:any,duration:any,nameCar:any,policyPick:any,yearBuy:any,carPick:Vehicle){
    this.marketValue = 0
    this.estimateValue = 0
    this.insuranceFeeValue = 0
    this.statusPopup=true;
    this.accountCustomer = e
    this.carNumber = carNumber
    this.bodyNumber =bodyNumber
    this.duration = duration
    this.nameCar = nameCar
    this.policyPick = policyPick
    this.marketValue = carPick.vehicleprice - ((this.currentYear-yearBuy)*0.07*carPick.vehicleprice)
    this.insuranceFeeValue = (this.marketValue*(policyPick.insurancepercent/100)*duration)
    this.estimateValue = this.marketValue
    this.expirationDate =  new Date()
    this.expirationDate = new Date(this.expirationDate.setYear(this.expirationDate.getFullYear()+duration));
    this.dateExpire = this.datePipe.transform(this.expirationDate,'yyyy-MM-dd');
    this.dateExpire1 = this.datePipe.transform(this.expirationDate,'dd-MM-yyyy');
    this.theft = policyPick.vehicletheft/100 * this.estimateValue
    this.accident = policyPick.vehicleaccident/100 * this.estimateValue
    this.flood = policyPick.flood/100 * this.estimateValue
    this.engine = policyPick.vehicleengine/100 * this.estimateValue
    this.body =  policyPick.vehiclebody/100 * this.estimateValue
    }
  closePopup() {
    this.statusPopup=false;
  }
  goNextTab(){
    if(this.input1.nativeElement.checked !=true ||this.input.nativeElement.checked !=true ){
      this.showError("Check agree at our policy ");
    }else{
    this.closePopup()
    this.buttonClick.emit(true)
    let item ={
        expireDate:this.dateExpire,
        valueestimate:(+this.marketValue)*(1-(+this.policyPick.vehicleaccident)*0.02),
        marketValuePrice:this.marketValue,
        accountId:this.accountCustomer.accountid,
        policyId:this.policyPick.policyid,
        amountPayment:((+this.duration)*this.policyPick.insurancepercent*this.marketValue/100).toFixed(2)
    }
    this.Parent.SetItem(item)
    }
    
  }
   showError(e:any) {
        this.messageService.add({severity:'error', summary: 'Error', detail: e});
    }
}
