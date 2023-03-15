import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './reloadoage.component.html',
})
export class ReLoadPageComponent implements OnInit {
  
  newsid:number
  constructor(
    private router: Router

  ) {}
    
  

  ngOnInit(): void {
    this.router.navigate(['/admin/policy']);

}
}
 