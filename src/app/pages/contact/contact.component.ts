import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit {

  tlfImg = `<i class="hide-mobile fas fa-phone mt-3 mb-3 fa-5x t-orange"></i>`;
  tlfText = `<p class="card-text fs-m text-center p-4 t-dark">
  Truca'ns al 
  <span class="t-orange">690783315</span>
  </p>`

  emailImg = `<i class="hide-mobile fas fa-envelope mt-3 mb-3 fa-5x t-orange"></i>`;
  emailText = `<p class="card-text fs-m text-center p-4 t-dark">
  Envia'ns un e-mail a 
  <span class="t-orange">cscfutsal2017@gmail.com</span>
  </p>`

  redesText = `
  <div class="mb-5 banner-card-line"></div>
  <p class="mt-0 mb-4 fs-m card-text text-center t-dark">
  Segueix-nos a les 
  <span class="t-orange">xarxes socials</span>
  </p>
  <div class="row no-gutters justify-content-center">
  <div class="col text-right">
  <a class="t-dark" href="https://twitter.com/CscFutsal" target="_blank">
  <i class="fa fa-twitter fa-5x orange-hover"></i>
  </a>
  </div>
  <div class="col text-left">
  <a class="t-dark" href="https://www.instagram.com/cscfutsal/" target="_blank">
  <i class="fa fa-instagram fa-5x orange-hover"></i>
  </a>
  </div>
  </div>
  <div class="mt-5 banner-card-line"></div>
  `

  constructor() { }

  ngOnInit(): void {
  }

  open(url:string){
    window.open(url, '_blank');
  }

}
