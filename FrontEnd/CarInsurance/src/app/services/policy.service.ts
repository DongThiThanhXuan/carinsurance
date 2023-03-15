import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Brandvehicle } from "../models/brandvehicle.model";
import { Policy } from "../models/policy.model";
import { PolicyTable } from "../models/policytable.model";
import { BaseURLService } from "./baseurl.service";



@Injectable()
export class PolicyService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
       //=================Code cua xuan

        public async findAllPolicy(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'policy/findAllPolicy');
            return await lastValueFrom(value);
        } 

        public async findPolicy(policyid:number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'policy/findPolicy/'+policyid);
            return await lastValueFrom(value);
        } 
        public async createPolicy(policy: PolicyTable){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'policy/createPolicy', policy);
            return await lastValueFrom(value);
        } 

        public async updatePolicy(policy: PolicyTable){
            var value=this.httpClient.put(this.baseURLService.BaseURL+ 'policy/updatePolicy', policy);
            return await lastValueFrom(value);
        }


        //=================Code cua Dat

        public async findAllPolicyD(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'policy/findAllPolicyD');
            return await lastValueFrom(value);
        } 
}

