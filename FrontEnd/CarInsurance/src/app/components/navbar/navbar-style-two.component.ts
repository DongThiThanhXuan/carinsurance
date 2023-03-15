import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar-style-two',
  templateUrl: './navbar-style-two.component.html',
  styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {

  checkRole:string;
  accountid:number;
  constructor(
    private accountservice:AccountService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("accountid") != null || localStorage.getItem("accountid") === "") {
      this.checkRole = localStorage.getItem("role");
      
    }
    else{
      this.checkRole=null;

    }
  }

}
