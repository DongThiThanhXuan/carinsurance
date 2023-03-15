import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { BaseURLService } from "./baseurl.service";



@Injectable()
export class VehicleService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
       //=================Code cua xuan
       public async showByid(vehicleid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/showByid/'+vehicleid);
        return await lastValueFrom(value);
        } 
       public async showModelByBrand(brandid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/showModelByBrand/'+brandid);
        return await lastValueFrom(value);
        }  
        public async showByModel(brandid:number,vehiclemodel:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/showByModel/'+brandid+'/'+vehiclemodel);
        return await lastValueFrom(value);
        } 
        
        //=================Code cua Lan
        public async findAllVehicle(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/findAllVehicle');
            return await lastValueFrom(value);
        } 

        public async createVehicle(vehicle: Vehicle){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'vehicle/createVehicle', vehicle);
            return await lastValueFrom(value);
        } 

        public async updateVehicle(vehicle: Vehicle){
            var value=this.httpClient.put(this.baseURLService.BaseURL+ 'vehicle/updateVehicle', vehicle);
            return await lastValueFrom(value);
        }

        public async CheckExistVehicle(brand: number, model: string, version: string, year: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/checkexistvehicle/' + brand + '/' + model + '/' + version + '/' + year);
            return await lastValueFrom(value);
        }

        public async CheckEditVehicle(id: number, brand: number, model: string, version: string, year: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/checkeditvehicle/' + id + '/' + brand + '/' + model + '/' + version + '/' + year);
            return await lastValueFrom(value);
        }

        public async countVehicle(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/countvehicle');
            return await lastValueFrom(value);
        }

        //=================Code cua Dat
}

