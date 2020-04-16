import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toShop() {
    Swal.fire({
      title: 'Copiat',
      text: 'Obrint botiga...',
      icon: 'success',
      showConfirmButton: false
    })
    setTimeout(() =>{
      window.open('https://play2015.es/csc-futsal/', '_blank')
      Swal.close();
    }, 1500)
  }

}
