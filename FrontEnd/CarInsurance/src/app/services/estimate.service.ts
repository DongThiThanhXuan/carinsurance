import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { Estimate } from "../models/estimate.model";
import { BaseURLService } from "./baseurl.service";



@Injectable()
export class EstimateService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
       //=================Code cua xuan
       public async findEstimateByid(estimateid: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'estimate/findEstimateByid/'+estimateid);
        return await lastValueFrom(value);
    }

        //=================Code cua Lan
        public async countEstimate(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'estimate/countEstimate');
            return await lastValueFrom(value);
        } 

        public async findAllContract(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'estimate/findAllContract');
            return await lastValueFrom(value);
        } 

        //=================Code cua Dat
        public async findAllEstimate(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'estimate/findAllEstimate');
            return await lastValueFrom(value);
        } 

        public async createEstimate(estimate: Estimate){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'estimate/createEstimate', estimate);
            return await lastValueFrom(value);
        } 

        public async findAllEstimateById(accountid: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'estimate/findAllEstimateByAccount/'+accountid);
            return await lastValueFrom(value);
        }
}

