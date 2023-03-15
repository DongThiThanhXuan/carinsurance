import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Brandvehicle } from "../models/brandvehicle.model";
import { BaseURLService } from "./baseurl.service";



@Injectable()
export class BrandvehicleService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
       //=================Code cua xuan


        //=================Code cua Lan
        public async findAllBrand(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'brand/findAllBrand');
            return await lastValueFrom(value);
        } 

        public async findById(brandid: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'brand/findById/' + brandid);
            return await lastValueFrom(value);
        } 

        public async createBrand(brand: Brandvehicle){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'brand/createBrand', brand);
            return await lastValueFrom(value);
        } 

        public async updateBrand(brand: Brandvehicle){
            var value=this.httpClient.put(this.baseURLService.BaseURL+ 'brand/updateBrand', brand);
            return await lastValueFrom(value);
        }

        //=================Code cua Dat
}

