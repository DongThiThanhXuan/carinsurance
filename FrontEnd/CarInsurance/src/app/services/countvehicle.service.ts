import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { BaseURLService } from "./baseurl.service";



@Injectable()
export class CountVehicleService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
       //=================Code cua xuan


        //=================Code cua Lan
        public async findAllVehicle(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'vehicle/findAllVehicle');
            return await lastValueFrom(value);
        } 

       
        //=================Code cua Dat
}

