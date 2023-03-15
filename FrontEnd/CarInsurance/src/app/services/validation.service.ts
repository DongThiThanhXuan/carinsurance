import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Account } from "../models/account.model";
import { Brandvehicle } from "../models/brandvehicle.model";
import { Vehicle } from "../models/vehicle.model";
import { AccountService } from "./account.service";

@Injectable()
export class Validation {
    checkpersonId: boolean;
    checkemail: boolean;
    checkVehicle: boolean
    checkbrandname: boolean
    constructor(private accountService: AccountService) {
    }

 //========================Xuan code===============================




//========================Lan code===============================
    checkString(str: string, field: string): string {
    var a: string = "";
    var string: string = str.trim();
    if (string == "" || string == null) {
        a = field + " can not be left blank";
    } else if (string.length > 100) {
        a = field + " no more than 100 characters";
    } else {
        a = "";
    }

    return a;
    }

    checkPersonId(id: string, accounts: Account[]): string {
        var error: string = "";
        this.checkpersonId = false;
        var personIdRegex = new RegExp("^[0-9]*$");
        var string: string = id.trim();
        accounts.forEach(s => {
            if (s.personid === string) {
                this.checkpersonId = true;
            }
        })
        if (string == "" || string == null) {
            error = "Person Id can not be left blank";
        } else if (string.length > 20) {
            error = "Person Id maximum 20 characters";
        } else if (this.checkpersonId) {
            error = "Person Id is already exists";
        } else if (!personIdRegex.test(string)) {
            error = "Person Id only contain numbers";
        } else {
            error = "";
        }
        return error;
    }


    checkEmail(str: string, accounts: Account[]): string {
        // "^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$"
        var error: string = "";
        this.checkemail = false;
        var mailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
        var string: string = str.trim();
        accounts.forEach(s => {
            if (s.accountemail === string) {
                this.checkemail = true;
            }
        })

        if (string == "" || string == null) {
            error = "Email can not be left blank";
        } else if (string.length > 100) {
            error = "Email no more than 100 characters";
        } else if (!mailRegex.test(string)) {
            error = "Email invalid";
        } else if (this.checkemail) {
            error = "Email is already exists";
        } else {
            error = "";
        }
        return error;
    }


    checkPass(pass: string): string {
        var a: string = "";
        var password: string = pass.trim();
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,10})");
        if (!strongRegex.test(password)) {
            console.log(strongRegex.test(password));
            a = "1 uppercase,1 lowercase,1 number and 1 special 6-10 characters ";
        }
        return a;
    }
    
    checkNull(field: number): string {
        var result: string = "";
        var check: number = field;
        if ( check == null) {
            result = "Please, fill this field!";
        } else {
            result = "";
        }
        return result;
    }

    //only alphabets with spaces
    checkFullname(name: string): string {
        var a: string = "";
        var nameRegex = new RegExp("^[a-zA-Z ]*$");
        if (name == "" || name == null) {
            a = "Fullname can not be blank";
        } else if (name.length > 100) {
            a = "Fullname no more than 100 characters";
        } else if (!nameRegex.test(name)) {
            a = "Fullname only contains letters";
        } else {
            a = "";
        }
        return a;
    }

     //only phone number
     checkPhone(phone: string): string {
        var a: string = "";
        var phoneRegex = new RegExp('^[0-9]*$');
        if (!phoneRegex.test(phone)) {
            a = "Number phone invalid!";
        } else {
            a = "";
        }
        return a;
    }

    //For 1950 - 2050
    checkYear(year: string): string {
        var a: string = "";
        var yearRegex = new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);
        if (!yearRegex.test(year)) {
            a = "Invalid year";
        } else {
            a = "";
        }
        return a;
    }

    checkBrand(brandname: string, brand: Brandvehicle[]): string {
        var error: string = "";
        this.checkbrandname = false;
      
        var string: string = brandname.toLowerCase().trim();
        brand.forEach(b => {
            if (b.brandname.toLowerCase().trim() === string) {
                this.checkbrandname = true;
            }
        })
        if (string == "" || string == null) {
            error = "Brandname can not be left blank";
        } else if (this.checkbrandname) {
            error = "Brandname is already exists";
        }  else {
            error = "";
        }
        return error;
    }
}