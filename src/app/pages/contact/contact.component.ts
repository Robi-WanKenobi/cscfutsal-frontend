import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit {

  tlfText = `
  <p class="card-text fs-m text-center">
  <a class="contact-anchor" href="tel:+34690783315" target="_blank">
  <span class="t-orange">Truca'ns</span>
  </a> 
  o 
  <a class="contact-anchor" href="https://api.whatsapp.com/send?phone=+34690783315" target="_blank">
  <span class="t-orange">escriu-nos</span>
  </a> 
  al 690783315</span>
  </p>`

  emailText = `
  <p class="card-text fs-m text-center">
  <a class="contact-anchor" href="mailto:cscfutsal2017@gmail.com" target="_blank">
  <span class="t-orange">Envia'ns un e-mail</span>
  </a> 
  a cscfutsal2017@gmail.com
  </p>`

  redesText = `
  <div class="mb-5 banner-card-line"></div>
  <p class="mt-0 mb-4 fs-m card-text text-center t-dark">
  <span class="t-orange">Segueix-nos</span> 
  a les xarxes socials
  </p>
  <div class="row no-gutters justify-content-center">
  <div class="col mr-4 text-right">
  <a class="t-dark" href="https://twitter.com/CscFutsal" target="_blank">
  <i class="fa fa-twitter fa-5x orange-hover"></i>
  </a>
  </div>
  <div class="col ml-4 text-left">
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
