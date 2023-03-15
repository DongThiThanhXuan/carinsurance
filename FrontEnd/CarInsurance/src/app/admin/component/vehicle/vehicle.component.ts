import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Brandvehicle } from 'src/app/models/brandvehicle.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { BrandvehicleService } from 'src/app/services/brandvehicle.service';
import { Validation } from 'src/app/services/validation.service';
import { VehicleService } from 'src/app/services/vehicle.service';
@Component({
  templateUrl: './vehicle.component.html',
})
export class VehicleComponent implements OnInit {

  first = 0;
  rows = 10;
  listvehicles: Vehicle[]
  selectVehicle: Vehicle
  getVehicleId: number
  getVehicle: Vehicle
  brands: Brandvehicle[]
  dialogInfo: string
  vehicleDialog: boolean
  editvehicleDialog: boolean
  addVehicleForm: FormGroup
  editVehicleForm: FormGroup
  errorbrand: string
  errormodel: string
  errorversion: string
  erroryear: string
  errorprice: string
  errorvehicle: string
  
  activityValues: number[] = [0, 100];
  constructor(
    private vehicleService: VehicleService,
    private brandService: BrandvehicleService,
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
   this.brandService.findAllBrand().then(
    res => {
      this.brands = res as Brandvehicle[]
    },
    err => {
      console.log(err)
    }
  );
  }

  reload(){
    this.listvehicles=null;
    this.vehicleService.findAllVehicle().then(
      res => {
        this.listvehicles = res as Vehicle[]
      },
      err => {
        console.log(err)
      }
    );
  }

  openAddVehicle(){
    this.vehicleDialog = true;
    this.errorbrand = "";
    this.errormodel = "";
    this.errorversion ="";
    this.erroryear = "";
    this.errorprice ="";
    this.addVehicleForm = this.formBuilder.group({
      brandid: null,
      vehiclemodel: '',
      vehicleversion: '',
      yearofmanufacture: '',
      vehicleprice: null,
    });
  }

  save1(){
    var vehicle: Vehicle = this.addVehicleForm.value;
    vehicle.vehiclemodel = vehicle.vehiclemodel.trim().toLocaleUpperCase();
    vehicle.vehicleversion = vehicle.vehicleversion.trim().toLocaleUpperCase();
    vehicle.yearofmanufacture = vehicle.yearofmanufacture;
    vehicle.vehicleprice = vehicle.vehicleprice;
 
    this.errormodel = this.validation.checkString(vehicle.vehiclemodel, "Vehicle model");
    this.errorversion = this.validation.checkString(vehicle.vehicleversion, "Vehicle version");
    this.erroryear = this.validation.checkYear(vehicle.yearofmanufacture.toString().trim());
    this.errorbrand = this.validation.checkNull(vehicle.brandid);
    this.errorprice = this.validation.checkNull(vehicle.vehicleprice);
    
    if (this.errormodel === "" && this.errorversion === "" && this.erroryear === "" && this.errorbrand === "" && this.errorprice == "") {
      this.vehicleService.CheckExistVehicle(vehicle.brandid, vehicle.vehiclemodel, vehicle.vehicleversion, vehicle.yearofmanufacture).then(
        res => {
          var re: ResultAPI = res as ResultAPI;
          if (re.result) {
            this.showError();
          } else {
            vehicle.vehiclemodel = vehicle.vehiclemodel.toLocaleUpperCase();
            vehicle.vehicleversion = vehicle.vehicleversion.toLocaleUpperCase();
           this.vehicleService.createVehicle(vehicle).then(
              res => {
                var re: ResultAPI = res as ResultAPI;
                if (re.result) {
                  this.dialogInfo = "A new vehicle has been created!";
                  this.addVehicleForm = this.formBuilder.group({
                    brandid: '',
                    vehiclemodel: '',
                    vehicleversion: '',
                    yearofmanufacture: '',
                    vehicleprice: '',
                  });
                  this.reload();
                  this.vehicleDialog = false;
                } else {
                  this.dialogInfo = "Create a new vehicle fail!";
                }
              }
              , err => {
                this.vehicleDialog = true;
                this.dialogInfo = "Failed";
                console.log(err);
              }
            )
          }
        }
        , err => {
          console.log(err);
        }
      )}
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Vehicle information exist!'});
  }


  openUpdate(vehicle: Vehicle){
    this.editvehicleDialog = true;
    this.errorbrand = "";
    this.errormodel = "";
    this.errorversion ="";
    this.erroryear = "";
    this.errorprice ="";
    this.editVehicleForm = this.formBuilder.group({
      vehicleid: vehicle.vehicleid,
      brandid: vehicle.brandid,
      vehiclemodel: vehicle.vehiclemodel,
      vehicleversion: vehicle.vehicleversion,
      yearofmanufacture: vehicle.yearofmanufacture,
      vehicleprice: vehicle.vehicleprice,
    });
  }

  save2(){
    this.getVehicle = this.editVehicleForm.value;
    this.getVehicleId = this.getVehicle.vehicleid;
    console.log("id: " + this.getVehicle.vehicleid)
    this.vehicleService.showByid(this.getVehicleId).then(
      trueresult =>{  
        this.selectVehicle = trueresult as Vehicle;
         if(this.getVehicle.brandid == this.selectVehicle.brandid && this.getVehicle.vehiclemodel.trim() == this.selectVehicle.vehiclemodel.trim() 
          && this.getVehicle.vehicleversion.trim() == this.selectVehicle.vehicleversion.trim() && this.getVehicle.yearofmanufacture == this.selectVehicle.yearofmanufacture
          && this.getVehicle.vehicleprice == this.selectVehicle.vehicleprice){
            this.showWarn();
        }else{
          this.getVehicle.vehiclemodel = this.getVehicle.vehiclemodel.trim().toLocaleUpperCase();
          this.getVehicle.vehicleversion = this.getVehicle.vehicleversion.trim().toLocaleUpperCase();
          this.getVehicle.yearofmanufacture = this.getVehicle.yearofmanufacture;
          this.getVehicle.vehicleprice = this.getVehicle.vehicleprice;
       
          this.errormodel = this.validation.checkString(this.getVehicle.vehiclemodel, "Vehicle model");
          this.errorversion = this.validation.checkString(this.getVehicle.vehicleversion, "Vehicle version");
          this.erroryear = this.validation.checkYear(this.getVehicle.yearofmanufacture.toString().trim());
          this.errorbrand = this.validation.checkNull(this.getVehicle.brandid);
          this.errorprice = this.validation.checkNull(this.getVehicle.vehicleprice);
          
          if (this.errormodel === "" && this.errorversion === "" && this.erroryear === "" && this.errorbrand === "" && this.errorprice == "") {
            this.vehicleService.CheckEditVehicle(this.getVehicle.vehicleid, this.getVehicle.brandid, this.getVehicle.vehiclemodel, this.getVehicle.vehicleversion, this.getVehicle.yearofmanufacture).then(
              res => {
                var re: ResultAPI = res as ResultAPI;
                if (re.result) {
                  this.showError();
                } else {
                  console.log("id: " + this.getVehicle.vehicleid)
                  this.getVehicle.vehiclemodel = this.getVehicle.vehiclemodel.toLocaleUpperCase();
                  this.getVehicle.vehicleversion = this.getVehicle.vehicleversion.toLocaleUpperCase();
                  this.vehicleService.updateVehicle(this.getVehicle).then(
                    res => {
                      var re: ResultAPI = res as ResultAPI;
                      if (re.result) {
                        this.dialogInfo = "Vehicle has been updated!";
                        this.reload();
                        this.editvehicleDialog = false;
                      } else {
                        this.dialogInfo = "Update vehicle fail!";
                      }
                    }
                    , err => {
                      this.editvehicleDialog = true;
                      this.dialogInfo = "Failed";
                      console.log(err);
                    }
                  )
                }
              }
              , err => {
                console.log(err);
              }
            )}
            
        }
      },
      erros=>{
        console.log(erros);
      }); 

  }

  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Vehicle inforamtion has not changed!'});
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
    return this.listvehicles ? this.first === (this.listvehicles.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listvehicles ? this.first === 0 : true;
}
}
 