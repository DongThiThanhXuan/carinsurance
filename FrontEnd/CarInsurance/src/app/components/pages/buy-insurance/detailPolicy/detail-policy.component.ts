import { Component, Injectable, OnInit,Inject, Output, EventEmitter } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Policy } from 'src/app/models/policy.model';

@Component({
  selector: 'detail-policy',
  templateUrl: './detail-policy.component.html',
  styleUrls: ['./detail-policy.component.scss']
})
@Injectable()
export class DetailPolicyComponent implements OnInit {
   @Output() buttonClick: EventEmitter<boolean> = new EventEmitter<boolean>();
   carName:string
   policyOffer:any
   statusPopup:any = false;
   constructor (@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.keyUpClose()
    this.policyOffer=null
  }
  keyUpClose(){
    document.onkeyup = function (e) {
     if (e.key === "Escape") {
     document.querySelector("body").classList.remove("showPopup");
  document.querySelector("body").classList.remove("removePopup");
  }
}
  }
  openPopup(e:any,name:any){
  this.statusPopup=true;
  this.carName =name
  this.policyOffer = e as Policy
  console.log(e)

  }
  closePopup() {
    this.statusPopup=false;

  }
  goNextTab(){
    this.closePopup()
    this.buttonClick.emit(true)
  }
  
}
