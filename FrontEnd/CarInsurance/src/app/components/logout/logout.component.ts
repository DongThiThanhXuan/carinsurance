import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

 
  constructor(
   private router: Router
  ) { }

  ngOnInit(): void {


    localStorage.clear();
    this.router.navigate(["/login-register"]);

  }
}
