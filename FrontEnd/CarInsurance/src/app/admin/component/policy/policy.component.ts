import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { Brandvehicle } from 'src/app/models/brandvehicle.model';
import { Policy } from 'src/app/models/policy.model';
import { PolicyTable } from 'src/app/models/policytable.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AccountService } from 'src/app/services/account.service';
import { BrandvehicleService } from 'src/app/services/brandvehicle.service';
import { PolicyService } from 'src/app/services/policy.service';
import { Validation } from 'src/app/services/validation.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  templateUrl: './policy.component.html',
})
export class PolicyAdminComponent implements OnInit {

  listaccount: Policy[];
  accounts: Policy[]
  selectedPolicys: Policy[]
  showpolicy: Policy;
  first = 0;
  rows = 10;
  username:string;
 

  policyDialog: boolean;
  showInfoPolicy: boolean;
  dialogInfo: string;
  displayDialog: boolean;
  loadingDialog: boolean;
  showListVehicle: boolean;
  showchoosenewstatus: boolean;

  count:number  ;


  errorPerId: string;
  errorName: string;
  errorPhone: string;
  errorEmail: string;


  vehicle:Vehicle;
  oldvehicle:Vehicle;
  allvehicle:Vehicle[];
  policyid:number;
  editpolicyid : number;
  editvehicleid : number;
  editvehiclewarranty : number;
  editvehicletheft :number;
  editvehicleaccident:number;
  editvehiclebody:number;
  editvehicleengine:number;
  editflood:number;
  editinsurancepercent:number;
  editpolicystatus:number;
  errorVehicleTheft:string;
  errorVehicleaccident:string;
  errorVehiclebody:string;
  errorVehicleengine:string;
  errorFlood:string;
  errorInsurancepercent:string;
  errorPolicystatus:string;
  checked2: boolean = true;
  stt:number;
  listWarranty:any[];
  warranty:any;

  //@ViewChild('dt') table: Table;

  activityValues: number[] = [0, 100];
  constructor(
    private PolicyServicp: PolicyService,
    private router: Router,
    private messageService: MessageService,
    private vehicleService:  VehicleService,
  ) {

  }
  ngOnInit(): void {
    this.listaccount=null;
    this.selectedPolicys=null;
     this.PolicyServicp.findAllPolicy().then(
       res => {
         this.listaccount = res as Policy[];
       },
       err => {
         console.log(err)
       }
     );
    this.showInfoPolicy=false;
    this.stt=0;

    this.vehicleService.findAllVehicle().then(
      res => {
        this.allvehicle = res as Vehicle[];    
      },
      err => {
        console.log(err)
      }
    );

    this.listWarranty=[
      {
        warranty:0,
        content:'Vehicle Out Of Warranty'
      },{
        warranty:1,
        content:'Vehicle Still Of Warranty'
      }
    ];
    this.warranty=null;
  }


  openAddPolicy(){
      this.policyDialog = true;
      this.errorVehicleTheft="";
      this.errorVehicleaccident="";
      this.errorVehiclebody="";
      this.errorVehicleengine="";
      this.errorFlood="";
      this.errorInsurancepercent="";
      this.errorPolicystatus="";
      this.vehicle=null;
      this.editpolicyid = null;
      this.editvehicleid =  null;
      this.editvehiclewarranty =  null;
      this.editvehicletheft = null;
      this.editvehicleaccident= null;
      this.editvehiclebody= null;
      this.editvehicleengine= null;
      this.editflood= null;
      this.editinsurancepercent= null;
      this.editpolicystatus=  null;

  }
  checkpercent(){
    
    var personIdRegex = new RegExp("(?=[^\0])(?=^([0-9]+){0,1}(\.[0-9]{1,2}){0,1}$)");
    if(this.editvehicletheft !=null){
      if (!personIdRegex.test(this.editvehicletheft.toString())) {
        this.errorVehicleTheft = "Wrong format, please take note: This field does not allow spaces";
      }else{
        if (this.editvehicletheft <0 || this.editvehicletheft>100) {
          this.errorVehicleTheft = "Please enter a number greater than or equal to 0 and less than or equal to 100";
        }else{
          if(this.editvehicleaccident !=null){
            if (!personIdRegex.test(this.editvehicleaccident.toString())) {
              this.errorVehicleaccident = "Wrong format, please take note: This field does not allow spaces";
            }else{
              if (this.editvehicleaccident <0 || this.editvehicleaccident>100) {
                this.errorVehicleaccident = "Please enter a number greater than or equal to 0 and less than or equal to 100";
              }else{
                if(this.editvehiclebody!=null){
                  if (!personIdRegex.test(this.editvehiclebody.toString())) {
                    this.errorVehiclebody = "Wrong format, please take note: This field does not allow spaces";
                  }else{
                    if (this.editvehiclebody <0 || this.editvehiclebody>100) {
                      this.errorVehiclebody = "Please enter a number greater than or equal to 0 and less than or equal to 100";
                    }else{
                      if(this.editvehicleengine!=null){
                        if (!personIdRegex.test(this.editvehicleengine.toString())) {
                          this.errorVehicleengine = "Wrong format, please take note: This field does not allow spaces";
                        }else{
                          if (this.editvehicleengine <0 || this.editvehicleengine>100) {
                            this.errorVehicleengine = "Please enter a number greater than or equal to 0 and less than or equal to 100";
                          }else{
                            if(this.editflood!=null){
                              if (!personIdRegex.test(this.editflood.toString())) {
                                this.errorFlood = "Wrong format, please take note: This field does not allow spaces";
                              }else{
                                if (this.editflood <0 || this.editflood>100) {
                                  this.errorFlood = "Please enter a number greater than or equal to 0 and less than or equal to 100";
                                } else{
                                  if(this.editinsurancepercent!=null){
                                    if (!personIdRegex.test(this.editinsurancepercent.toString())) {
                                      this.errorInsurancepercent = "Wrong format, please take note: This field does not allow spaces";
                                    }else{
                                      if (this.editinsurancepercent <0 || this.editinsurancepercent>100) {
                                        this.errorInsurancepercent = "Please enter a number greater than or equal to 0 and less than or equal to 100";
                                    }
                                    }
                                  }else{
                                    this.errorInsurancepercent = "Please fill this field";
                                  }
                                }
                              }
                            }else{
                              this.errorFlood = "Please fill this field";
                            }
                          }
                        }
                      }else{
                        this.errorVehicleengine = "Please fill this field";
                      }
                    }

                  }
                }else{
                  this.errorVehiclebody = "Please fill this field";
                }
              }
            }
          }else{
            this.errorVehicleaccident = "Please fill this field";
          }
        }
        
      }
    }else{
      this.errorVehicleTheft = "Please fill this field";
    }
  }

  
  save(){
    this.errorVehicleTheft="";
    this.errorVehicleaccident="";
    this.errorVehiclebody="";
    this.errorVehicleengine="";
    this.errorFlood="";
    this.errorInsurancepercent="";
    this.errorPolicystatus="";
    this.checkpercent();
    var existspolicy=null;
    if(this.errorVehicleTheft=="" && this.errorVehicleaccident=="" && this.errorVehiclebody=="" && this.errorVehicleengine=="" &&this.errorFlood=="" && this.errorInsurancepercent=="" ){
      if(this.vehicle !=null){
        if(this.warranty !=null){
           existspolicy=this.listaccount.filter(p=> p.vehicleid==this.vehicle.vehicleid && p.vehiclewarranty==this.warranty.warranty && p.vehicletheft==this.editvehicletheft &&
             p.vehicleaccident== this.editvehicleaccident && p.vehiclebody==this.editvehiclebody && p.vehicleengine== this.editvehicleengine && p.flood==this.editflood && p.insurancepercent== this.editinsurancepercent);
         console.log(existspolicy);
             if(existspolicy.length==0){
            var p :PolicyTable =  {
              policyid :  0,
              vehicleid : this.vehicle.vehicleid,
              vehiclewarranty : this.warranty.warranty,
              vehicletheft :this.editvehicletheft,
              vehicleaccident:this.editvehicleaccident,
              vehiclebody:this.editvehiclebody,
              vehicleengine:this.editvehicleengine,
              flood:this.editflood,
              insurancepercent:this.editinsurancepercent,
              policystatus:0,
            };
            this.PolicyServicp.createPolicy(p).then(
              res=>{
                  var resl: ResultAPI=res as ResultAPI  ;
                  if(resl.result){
                    this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Valued Saved'});      
                    this.router.navigate(['/admin/reloadpage/']);
                  }else{
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                  }
              },
              err=>{
                  console.log(err);
              }
            );
      
            this.showInfoPolicy=false;
         }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'There is already a policy with similar information, please check again'});
         }
             
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please set warranty status'});
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Choose Vehicle'});
      }
      

    }  

  }

  showEdit(policy:Policy){
    this.errorVehicleTheft="";
    this.errorVehicleaccident="";
    this.errorVehiclebody="";
    this.errorVehicleengine="";
    this.errorFlood="";
    this.errorInsurancepercent="";
    this.errorPolicystatus="";
    this.showInfoPolicy=true;
    
   
    this.PolicyServicp.findPolicy(policy.policyid).then(
      res => {
          this.showpolicy = res as Policy;         
          this.editpolicyid = this.showpolicy.policyid;
          this.editvehicleid =  this.showpolicy.vehicleid;
          this.editvehiclewarranty =  this.showpolicy.vehiclewarranty;
          this.editvehicletheft = this.showpolicy.vehicletheft;
          this.editvehicleaccident= this.showpolicy.vehicleaccident;
          this.editvehiclebody= this.showpolicy.vehiclebody;
          this.editvehicleengine= this.showpolicy.vehicleengine;
          this.editflood= this.showpolicy.flood;
          this.editinsurancepercent= this.showpolicy.insurancepercent;
          this.editpolicystatus=  this.showpolicy.policystatus;
          this.vehicleService.showByid(this.editvehicleid).then(
            res => {
              this.vehicle = res as Vehicle;    
              this.oldvehicle=this.vehicle;
            },
            err => {
              console.log(err)
            }
          );
          if(this.editvehiclewarranty==1){
            this.warranty={
                warranty:1,
                content:'Vehicle Still Of Warranty'
              }

          }else{
            this.warranty={
              warranty:0,
              content:'Vehicle Out Of Warranty'
            }
          }
      },
      err => {
        console.log(err)
      }
    );
  
  }
 
  showlistVehicle(){
  this.showListVehicle=true;
  this.showInfoPolicy=false;
  }
  addnewvehicle(){
    this.showListVehicle=false;
    this.showInfoPolicy=true;
  }
  cancelshowlistvehicle(){
    this.vehicle=this.oldvehicle;
    this.showListVehicle=false;
    this.showInfoPolicy=true;
  }
  Edit(){
    this.errorVehicleTheft="";
    this.errorVehicleaccident="";
    this.errorVehiclebody="";
    this.errorVehicleengine="";
    this.errorFlood="";
    this.errorInsurancepercent="";
    this.errorPolicystatus="";
    this.checkpercent();

    if(this.errorVehicleTheft=="" && this.errorVehicleaccident=="" && this.errorVehiclebody=="" && this.errorVehicleengine=="" &&this.errorFlood=="" && this.errorInsurancepercent=="" ){
      var existspolicy=null;
      existspolicy=this.listaccount.filter(p=>p.policyid != this.editpolicyid && p.vehicleid==this.vehicle.vehicleid && p.vehiclewarranty==this.warranty.warranty && p.vehicletheft==this.editvehicletheft &&
        p.vehicleaccident== this.editvehicleaccident && p.vehiclebody==this.editvehiclebody && p.vehicleengine== this.editvehicleengine 
        && p.flood==this.editflood && p.insurancepercent== this.editinsurancepercent);
        console.log(existspolicy);
        if(existspolicy.length==0){
          var p :PolicyTable =  {
            policyid :  this.editpolicyid,
            vehicleid :  this.editvehicleid,
            vehiclewarranty : this.warranty.warranty,
            vehicletheft :this.editvehicletheft,
            vehicleaccident:this.editvehicleaccident,
            vehiclebody:this.editvehiclebody,
            vehicleengine:this.editvehicleengine,
            flood:this.editflood,
            insurancepercent:this.editinsurancepercent,
            policystatus:this.editpolicystatus,
          };
          this.PolicyServicp.updatePolicy(p).then(
            res=>{
                var resl: ResultAPI=res as ResultAPI  ;
                if(resl.result){
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Valued Saved'});      
                  this.router.navigate(['/admin/reloadpage/']);
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          );
    
          this.showInfoPolicy=false;
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'There is already a policy with similar information, please check again'});
         }
      
    }
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


  changestatus(){
    console.log(this.selectedPolicys);

    var checkstt1=0;
    var checkstt2=0;
    for(var i=0;i<this.selectedPolicys.length;i++){
        if(this.selectedPolicys[i].policystatus==1){
          checkstt1=1;
        }if(this.selectedPolicys[i].policystatus==2){
          checkstt2=1;
        }

    }
    if(checkstt1==1 && checkstt2==1){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'You can only change the status of a group of cases with the same status'});
    }else{
      this.showchoosenewstatus=true;
    }
  }

  choosenewstatus(){
   
    if(this.checked2){
      this.editpolicystatus=1;
    }else{
      this.editpolicystatus=2;
    }

   this.count=0;
    for(var i=0;i<this.selectedPolicys.length;i++){
      var p :PolicyTable =  {
        policyid :  this.selectedPolicys[i].policyid,
        vehicleid :  this.selectedPolicys[i].vehicleid,
        vehiclewarranty : this.selectedPolicys[i].vehiclewarranty,
        vehicletheft :this.selectedPolicys[i].vehicletheft,
        vehicleaccident:this.selectedPolicys[i].vehicleaccident,
        vehiclebody:this.selectedPolicys[i].vehiclebody,
        vehicleengine:this.selectedPolicys[i].vehicleengine,
        flood:this.selectedPolicys[i].flood,
        insurancepercent:this.selectedPolicys[i].insurancepercent,
        policystatus:this.editpolicystatus,
      };
      this.PolicyServicp.updatePolicy(p).then(
        res=>{
           var resultAPI:ResultAPI=res as ResultAPI  ;
            if(!resultAPI.result){
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
             
              return false;
            }
        },
        err=>{
            console.log(err);
        }
      );

    }
    this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Successful'});  
    this.showchoosenewstatus=false;
     this.router.navigate(['/admin/reloadpage/']);
   
  }


}
 