import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EstimateL } from 'src/app/models/estimateL.model';
import { EstimateService } from 'src/app/services/estimate.service';

@Component({
  templateUrl: './contract.component.html',
})
export class ContractComponent implements OnInit {

  first = 0;
  rows = 10;
  listcontracts: EstimateL[]
  detailDialog: boolean
  detailForm: FormGroup

  
  activityValues: number[] = [0, 100];
  constructor(
    private estimateService: EstimateService,
    private formBuilder: FormBuilder
  ) {

  }
  

  ngOnInit(): void {
    this.listcontracts=null;
    this.estimateService.findAllContract().then(
      res => {
        this.listcontracts = res as EstimateL[]
        console.log(this.listcontracts)
      },
      err => {
        console.log(err)
      }
    );
   
  }

  openDetail(contract: EstimateL){
    this.detailDialog = true
    this.detailForm = this.formBuilder.group({
      fullname: contract.fullname,
      personid: contract.personid,
      email: contract.email,
      phone: contract.phone,
      address: contract.address ? contract.address : 'Not update yet',
      vehiclebrand: contract.vehiclebrand,
      vehiclemodel: contract.vehiclemodel,
      vehicleversion: contract.vehicleversion,
      vehicleyear: contract.vehicleyear,
      vehiclebodynumber: contract.vehiclebodynumber, 
      vehicleenginenumber:contract.vehicleenginenumber,
      buyyear: contract.buyyear ,
      marketvalue: contract.marketvalue.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
      valueestimate: contract.valueestimate.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
      policyid: contract.policyid,
      vehicletheft: contract.vehicletheft +  ' %', 
      vehicleaccident: contract.vehicleaccident + ' %',  
      vehiclebody: contract.vehiclebody + ' %',  
      vehicleengine: contract.vehicleengine + ' %',  
      flood: contract.flood + ' %',  
      insurancepercent: contract.insurancepercent + ' %',  
      insurancefee: contract.insurancefee.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),  
      paymentdate: contract.paymentdate,  
      expirationdate:contract.expirationdate,  
      numberyear: contract.numberyear + ' year',  
      paypalbillno: contract.paypalbillno
    });
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
    return this.listcontracts ? this.first === (this.listcontracts.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listcontracts ? this.first === 0 : true;
}
}
 