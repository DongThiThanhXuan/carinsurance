import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Brandvehicle } from 'src/app/models/brandvehicle.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';

import { BrandvehicleService } from 'src/app/services/brandvehicle.service';
import { Validation } from 'src/app/services/validation.service';

@Component({
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {

  first = 0;
  rows = 10;
  listbrands: Brandvehicle[]
  selectBrand: Brandvehicle
  getBrandId: number
  getBrand: Brandvehicle
  brands: Brandvehicle[]
  dialogInfo: string
  brandDialog: boolean
  editbrandDialog: boolean
  addBrandForm: FormGroup
  editBrandForm: FormGroup
  errorbrand: string

  
  activityValues: number[] = [0, 100];
  constructor(
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
   
  }

  reload(){
    this.listbrands=null;
    this.brandService.findAllBrand().then(
      res => {
        this.listbrands = res as Brandvehicle[]
      },
      err => {
        console.log(err)
      }
    );
  }

  openAddBrand(){
    this.brandDialog = true;
    this.errorbrand = "";
    this.addBrandForm = this.formBuilder.group({
      brandname: ''
    });
  }

  save1(){
    var brand: Brandvehicle = this.addBrandForm.value;
    brand.brandname = brand.brandname.trim();
    console.log("list: " + this.listbrands)
    this.errorbrand = this.validation.checkBrand(brand.brandname, this.listbrands);
    if (this.errorbrand === "") {
      brand.brandname = brand.brandname.toLocaleUpperCase();
      this.brandService.createBrand(brand).then(
           trueresult =>
           {  
            var re: ResultAPI = trueresult as ResultAPI;
            if(re.result){
              this.dialogInfo = "A new brand has been created!";
              this.reload();
              this.brandDialog = false;
            }
           },err =>{
            this.editbrandDialog = true;
            this.dialogInfo = "Failed";
            console.log(err);
           })
  }
}

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Vehicle information exist!'});
  }


  openUpdate(brand: Brandvehicle){
    this.editbrandDialog = true;
    this.errorbrand = "";
    this.editBrandForm = this.formBuilder.group({
      brandid: brand.brandid,
      brandname: brand.brandname
    });
  }

  save2(){
    this.getBrand = this.editBrandForm.value;
    this.getBrandId = this.getBrand.brandid;
    console.log("id: " + this.getBrandId)
    this.brandService.findById(this.getBrandId).then(
      trueresult =>{  
        this.selectBrand = trueresult as Brandvehicle;
         if(this.getBrand.brandname == this.selectBrand.brandname){
            this.showWarn();
        }else{
          this.getBrand.brandname = this.getBrand.brandname.trim().toLocaleUpperCase();
          this.errorbrand = this.validation.checkBrand(this.getBrand.brandname, this.listbrands);
          if (this.errorbrand === "") {
                  this.brandService.updateBrand(this.getBrand).then(
                    res => {
                      var re: ResultAPI = res as ResultAPI;
                      if (re.result) {
                        this.dialogInfo = "Brand has been updated!";
                        this.reload();
                        this.editbrandDialog = false;
                      } else {
                        this.dialogInfo = "Update brand fail!";
                      }
                    }
                    , err => {
                      this.editbrandDialog = true;
                      this.dialogInfo = "Failed";
                      console.log(err);
                    }
                  )
                }
              }
      },
      erros=>{
        console.log(erros);
      }); 

  }

  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Brand inforamtion has not changed!'});
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
    return this.listbrands ? this.first === (this.listbrands.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listbrands ? this.first === 0 : true;
}
}
 