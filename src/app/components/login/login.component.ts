import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  @ViewChild('loginSwal') private loginSwal: SwalComponent;

  constructor(public auth: AuthService,
              private router: Router,
              private fb: FormBuilder) {
  
    this.createForm();
  
  }

  ngOnInit(): void {
  }

  get emptyUser() {
    return this.formLogin.get('usuario').invalid && this.formLogin.get('usuario').touched;
  }
  get emptyPassword() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }

  createForm() {
    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  doLogin() {
    this.loading = true;
    if (this.formLogin.invalid) {
      this.loading = false;
      return Object.values( this.formLogin.controls).forEach(control =>
        control.markAsTouched()
      );
    }
    this.auth.login(this.formLogin.value).subscribe((res:any) => {
      localStorage.setItem('token', res.token);
      this.loading = false;
      this.router.navigateByUrl('/admin');
      this.auth.isLogged = true;
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
    }, () => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        showCancelButton: true,
        showConfirmButton: true,
        buttonsStyling: false,
        cancelButtonText: 'Tancar',
        confirmButtonText: 'Tornar a intentar',
        customClass: {
          confirmButton: 'btn btn-outline-orange login-alert',
          cancelButton: 'btn btn-danger login-alert'
        },
      }).then((value) => {
        if (value.dismiss) {
          return;
        }
        this.loginSwal.fire();
      })
    })
  }

  doLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

  toAdminPanel() {
    this.router.navigateByUrl('/admin');
  }
}
