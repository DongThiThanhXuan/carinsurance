import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Account } from "../models/account.model";
import { LoginModel } from "../models/login.model";
import { BaseURLService } from "./baseurl.service";



@Injectable()
export class AccountService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
       //=================Code cua xuan
       public async findbyemail(email:String){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/findbyemail/'+email);
        return await lastValueFrom(value);
        } 
        public async createAccount2(account: Account){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'account/createAccount2', account);
            return await lastValueFrom(value);
        }
        //=================Code cua Lan
        public async findAll(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/findAll');
            return await lastValueFrom(value);
        }

        public async findById(id: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/findById/' + id);
            return await lastValueFrom(value);
        }

        public async findAllCustomer(){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/findAllCustomer');
            return await lastValueFrom(value);
        } 

        public async createAccount(account: Account){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'account/createAccount', account);
            return await lastValueFrom(value);
        }

        public async updateAccount(account: Account){
            var value=this.httpClient.put(this.baseURLService.BaseURL+ 'account/updateAccount', account);
            return await lastValueFrom(value);
        }
        
        public async updateStatus(accountid: number, stt: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/updateStatus/' + accountid + '/'+  stt);
            return await lastValueFrom(value);
        }
        
        public async checkInsuranceExp(accountid: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/checkInsuranceExp/' + accountid);
            return await lastValueFrom(value);
        } 

        public async findListNotContain(accountid: number){
            var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/findListNotCotain/' + accountid);
            return await lastValueFrom(value);
        }

        public async changePassword(change: LoginModel){
            var value=this.httpClient.post(this.baseURLService.BaseURL+ 'account/changePass', change);
            return await lastValueFrom(value);
        }

        //=================Code cua Dat
       
}

