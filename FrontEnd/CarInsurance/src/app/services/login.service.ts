import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { LoginModel } from "../models/login.model";




@Injectable()
export class LoginService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient,
        
    ){}
    
    public async checkLogin(login:LoginModel){
        var value=this.httpClient.post(this.baseURLService.BaseURL+'login/checkLogin',login);
        return await lastValueFrom(value);
    }
   
}