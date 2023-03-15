import { Component, Injectable, OnInit,Inject, ViewChild } from '@angular/core';

import {
    IPayPalConfig,
    ICreateOrderRequest 
} from 'ngx-paypal';
import { DOCUMENT,DatePipe} from '@angular/common';
import { DetailPolicyComponent } from './detailPolicy/detail-policy.component';
import { PreviewFormComponent } from './previewForm/preview-form.component';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { Brandvehicle } from 'src/app/models/brandvehicle.model';
import { BrandvehicleService } from 'src/app/services/brandvehicle.service';
import { PolicyService } from 'src/app/services/policy.service';
import { AccountService } from 'src/app/services/account.service';
import { Policy } from 'src/app/models/policy.model';

import {MessageService} from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { Estimate } from 'src/app/models/estimate.model';
import { EstimateService } from 'src/app/services/estimate.service';
import { ResultAPI } from 'src/app/models/resultapi.model';
declare function nextPrev(n:any):any
declare function chooseItem(event:any):any
declare function showCurrentTab():any
declare function payPalDone():any
@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.scss']
})
@Injectable()
export class BuyInsuranceComponent implements OnInit {
  abc:string =""
  public payPalConfig ? : IPayPalConfig;
  @ViewChild(DetailPolicyComponent) detailPolicy:DetailPolicyComponent;
  @ViewChild(PreviewFormComponent) previewForm:PreviewFormComponent;
  @ViewChild('carNumber') input;
  @ViewChild('bodyNumber') input1;
  @ViewChild('duration') input2;
  @ViewChild('inputSearch') input3;
  listvehicles: Vehicle[]
  brands: Brandvehicle[]
  accountLogin:any = true
  listVehicle:any
  yearVehicle:any
  yearPick: any
  brandVehicle:String[] = []
  brandPick:any
  modelVehicle:any
  modelPick:any
  versionVehicle:any
  versionPick:any
  accidentStatus:any
  policyOffer:any
  policyWarranty:number
  vehicleId:number
  yearBuy:any = []
  policyId:number
  accountCustomer:Account
  monthDuration:any
  policyPick:Policy
  carPick:Vehicle
  item:any
  key:string;
  timePaypal:any
  billPaypalId:any
  payPalstatus: boolean=false;
  statusSearch:boolean =false
  autoCompleteVehicle: string[]= [];
  filteredCountries: any[];
  selectedCountry:any;
  paymentstt:string;
 constructor (
  
  @Inject(DOCUMENT) private document: Document,
   private vehicleService: VehicleService,
    private brandService: BrandvehicleService,
    private policyService: PolicyService,
    private accountService: AccountService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private estimateService:EstimateService
 ) {}
    
   
  ngOnInit(): void {
    
    this.initConfig();
    this.item=null
    this.getMonthDuration()
    this.getAccountCustomer();
    this.checkLogin()
    this.yearPick=""
    this.brandPick=""
    this.modelPick=""
    this.versionPick=""
   showCurrentTab();
    this.yearBuy = []
    this.brandVehicle=[]
    this.modelVehicle=[]
    this.versionVehicle=[]
    this.policyOffer=[]
    this.reloadVehicle()
    this.reloadPolicy()
  }
  getMonthDuration(){
    this.monthDuration = [1,2,3]
    
}
public SetItem(e:any){
    this.item={
        valueestimate:e.marketValuePrice,
        accountId:e.accountId,
        policyId:e.policyId,
        amountPayment:e.amountPayment,
        marketValuePrice:e.marketValuePrice,
        expireDate:e.expireDate
    }
    console.log(this.item)
   
  }
  getAccountCustomer(){
      let accountId = +localStorage.getItem("accountid")
     this.accountService.findById(accountId).then(res=>{
      this.accountCustomer = res as Account
   
     })
    
  }
  checkLogin(){
     if (localStorage.getItem("accountid") != null || localStorage.getItem("accountid") === "") {
        this.accountLogin=false;
    }
    else{
         this.accountLogin=true;
    }
   
  }
  reloadPolicy(){
    this.policyService.findAllPolicyD().then(
      res => {
        this.policyOffer = res as Policy[]
        console.log(this.policyOffer)
       
      },
      err => {
        console.log(err)
      }
    );
  }
  reloadVehicle(){
    this.listvehicles=[];
    this.vehicleService.findAllVehicle().then(
      res => {
        this.listvehicles = res as Vehicle[]
       
        this.listvehicles.forEach(x=>{
          this.brandVehicle.push(x.brand)
        }
         
          )
           this.brandVehicle = [...new Set(this.brandVehicle)]

      },
      err => {
        console.log(err)
      }
    );
  }
  nextPrev(n:any){
    nextPrev(n)

  }
  showPolicyDetails(e:any){
    let name= this.brandPick+"-"+this.modelPick+"-"+this.yearPick+"-"+this.versionPick
    this.policyPick=e
    this.detailPolicy.openPopup(e,name);
    this.policyId = e.policyid
  
  }
   showPreviewForm(e:any){
    
    if(this.input.nativeElement.value==""||this.input1.nativeElement.value==""){
        this.showError("Fill all the inputs")
    }else if(this.input2.nativeElement.value==""){
      this.showError("Select the duration ")
    }
    else{
      let name= this.brandPick+"-"+this.modelPick+"-"+this.yearPick+"-"+this.versionPick
      console.log(this.accountCustomer)
      this.previewForm.openPopup(this.accountCustomer,this.input.nativeElement.value,this.input1.nativeElement.value,+this.input2.nativeElement.value,name,this.policyPick,this.yearPick,this.carPick);
    }
   
  }


    
    showError(e:any) {
        this.messageService.add({severity:'error', summary: 'Error', detail: e});
    }
  chooseItem(event:any){
   
    if(event.target.value=="Yes"){
      this.policyWarranty = 1
    }else{
        this.policyWarranty = 0
    }
    this.policyService.findAllPolicyD().then(
      res => {
        this.policyOffer = res as Policy[]
        this.policyOffer = this.policyOffer.filter(x=>x.vehiclewarranty== this.policyWarranty&&x.vehicleid==this.vehicleId&&x.policystatus==1)
  
        if(this.policyOffer.length===0){
      this.showError("Sorry! We don't have any policy for your car! Please choose another car")
      
    }else{
       chooseItem(event)
    }
      },
      err => {
        console.log(err)
      }
    );
    
   
  }
  ClearInput(){
  this.input3.nativeElement.value = ""
  this.statusSearch=false
  this.autoCompleteVehicle = []
  this.listvehicles.filter(x=>x.brand == this.brandPick).forEach(x=>{
      this.autoCompleteVehicle.push(x.vehiclemodel+" version "+x.vehicleversion)
    })
  }
  chooseYear(event:any){
   
    this.yearPick=event.target.value
    console.log((new Date().getFullYear()) - (+this.yearPick))
    if((new Date().getFullYear()) - (+this.yearPick)>13){
      this.showError("Sorry! We don't have any policy for the car models manufactured more than 13 year")
    }else{ 
      chooseItem(event)
    }
    

  }
  chooseBrand(event:any){
    chooseItem(event)
    this.brandPick=event.target.value
    this.autoCompleteVehicle = []
    this.listvehicles.filter(x=>x.brand == this.brandPick).forEach(x=>{
      this.autoCompleteVehicle.push(x.vehiclemodel+" version "+x.vehicleversion)
    })

    this.autoCompleteVehicle = [...new Set(this.autoCompleteVehicle)]
  
  }
  chooseModel(event:any){
    chooseItem(event)
    this.modelPick=event.target.value
    this.versionVehicle=[]
     this.listvehicles.filter(x=>x.vehiclemodel ==  this.modelPick).forEach(x=>{
      this.versionVehicle.push(x.vehicleversion)
    })
     this.versionVehicle = [...new Set(this.versionVehicle)]
  }
  chooseVersion(event:any){
    var splitted = event.target.value.split(" version ", 2); 
    this.modelPick = splitted[0]
    this.versionPick = splitted[1]
    chooseItem(event)
    this.yearBuy=[]
    var yearManufacture
    this.listvehicles.filter(x=>x.vehiclemodel == splitted[0]&&x.vehicleversion == splitted[1]).forEach(x=>{
      this.vehicleId = x.vehicleid
      this.carPick = x
      yearManufacture = x.yearofmanufacture
    })

    
    const currentYear = new Date().getFullYear();
      for(var i=yearManufacture;i<=currentYear;i++){
         this.yearBuy.push(i)
      }
  }
  public onButtonClick(event: MouseEvent): void { 
    nextPrev(1)
  }
   public onButtonClick1(event: MouseEvent): void { 
    nextPrev(1)
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AfqG0xOGLvNe_fnRbvTJvyMfTlKnCIUtsc2HvjRK_eQ8FOQJw8qJcAD-dL_xehGwYrgSnptOkQPk3euZ',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.item.amountPayment,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.item.amountPayment
                }
              }
            },
            items: [
              {
                name: this.item.accountId,
                quantity: '1',
                description:this.item.policyId,
                
                unit_amount: {
                  currency_code: 'USD',
                  value: this.item.amountPayment,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
  
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          this.messageService.add({severity:'success', summary: 'Infomation', detail: 'on Approve'});
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Completed Transaction'});
        this.payPalstatus= true
        this.paymentstt=data.status;
        this.timePaypal = this.datePipe.transform(data.create_time,'yyyy-MM-dd');
        this.billPaypalId = data.id;
        if(this.paymentstt=='COMPLETED'){
          this.insertEstimate();
          
        }
        payPalDone()
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Cancel'});
      },
      onError: err => {
        console.log('OnError', err);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error'});
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };

  }
  insertEstimate(){
    var estimate:Estimate = new Estimate();
    estimate.accountid = this.accountCustomer.accountid
    estimate.policyid = this.policyPick.policyid
    estimate.vehiclebodynumber = (this.input1.nativeElement.value).toUpperCase()
    estimate.vehicleenginenumber = (this.input.nativeElement.value).toUpperCase()
    estimate.buyyear = this.yearPick
    estimate.numberyear = +this.input2.nativeElement.value
    estimate.marketvalue = this.item.marketValuePrice.toFixed()
    estimate.insurancefee = +this.item.amountPayment
    estimate.valueestimate = this.item.marketValuePrice.toFixed()
    estimate.paymentdate = this.timePaypal
    estimate.expirationdate=this.item.expireDate
    estimate.paypalbillno  = this.billPaypalId
    estimate.remark = ""
    console.log("accid: " + estimate.accountid)
    console.log("polyid: " + estimate.policyid)
    console.log("body: " + estimate.vehiclebodynumber)
    console.log("eng: " + estimate.vehicleenginenumber)
    console.log("buy: " + estimate.buyyear)
    console.log("numberbuy: " + estimate.numberyear)
    console.log("id: " + estimate.paymentdate)
    console.log("id: " + estimate.expirationdate)
    console.log("id: " + estimate.paypalbillno)
    this.estimateService.createEstimate(estimate).then(
      res=>{
        var re: ResultAPI = res as ResultAPI;
        console.log(re.result)
        if (re.result) {
          this.nextPrev(1)
        }
        else{
          console.log("fail")
        } 
    },
    err => {
      console.log(err)
    })
   
  }

    //Search auto complete
   
 
  search(event:any){
      this.key=event.query;
      console.log(this.key);
      this.autoCompleteVehicle =this.autoCompleteVehicle.filter(item=>item.toUpperCase().indexOf(this.key.toUpperCase()) !== -1)
  }

  chooseVersion1(){
    var splitted = this.key.split("version", 2);
    this.modelPick = splitted[0].trim();
    this.versionPick = splitted[1].trim();
    this.yearBuy=[];
    console.log(this.modelPick);
    console.log(this.versionPick);

    var yearManufacture;
    this.listvehicles.filter(x=>x.vehiclemodel == this.modelPick &&x.vehicleversion == this.versionPick).forEach(x=>{
      this.vehicleId = x.vehicleid
      this.carPick = x
      yearManufacture = x.yearofmanufacture
    })

    
    const currentYear = new Date().getFullYear();
      for(var i=yearManufacture;i<=currentYear;i++){
         this.yearBuy.push(i)
      }
  }
 reloadPage(){
  window.location.reload()
 }
}
