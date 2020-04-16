import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Observable } from 'rxjs';
import { EquipoModel } from 'src/app/models/equipo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styles: []
})
export class TeamFormComponent implements OnInit {

  equipoId: string;
  equipo: EquipoModel;
  formTeam: FormGroup;
  isNew: boolean;

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.createForm();
    this.equipoId = this.route.snapshot.paramMap.get('id');
    if (this.equipoId === 'new') {
      this.isNew = true;
    }
    else {
      this.isNew = false;
      this.loadData();
    }
  }

  ngOnInit(): void {
  }

  loadData() {
    this.backend.getEquipo(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
      this.formTeam.reset(this.equipo);
    })
  }

  createForm() {
    this.formTeam = this.fb.group({
      nombre: ['', [Validators.required]],
      nombreToSearch: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      liga: ['', [Validators.required]],
      resultadosUrl: ['', [Validators.required]],
      clasificacionUrl: ['', [Validators.required]],
      calendarioUrl: ['', [Validators.required]],
    });
  }

  save() {
    if (this.formTeam.valid) {

      let backendRequest: Observable<any>;

      if (this.isNew){
        backendRequest = this.backend.saveEquipo(this.formTeam.value);
      }
      else {
        backendRequest = this.backend.updateEquipo(this.equipoId, this.formTeam.value);
      }

      backendRequest.subscribe(() =>{
        Swal.showLoading();
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/admin/teams');
      }, (err) => {
        console.log(err);
        Swal.fire({
          customClass: {
            confirmButton: 'btn btn-outline-orange'
          },
          buttonsStyling: false,
          icon: 'error'
        })
      })
    }
  }

  delete() {
    Swal.fire({
      title: 'Estàs segur?',
      text: "L'equip s'eliminarà permanentment",
      icon: 'warning',
      customClass: {
        confirmButton: 'btn btn-outline-orange ml-1',
        cancelButton: 'btn btn-outline-danger mr-1'
      },
      buttonsStyling: false,
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancel·lar'
    }).then((result) => {
      if (result.value) {
        this.backend.deleteEquipo(this.equipoId).subscribe(() => {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigateByUrl('/admin/teams');
        }, (err) => {
          console.log(err);
          Swal.fire({
            customClass: {
              cancelButton: 'btn btn-outline-danger'
            },
            buttonsStyling: false,
            icon: 'error'
          })
        });
      } 
    })
  }

  get emptyNombre() {
    return this.formTeam.get('nombre').invalid && this.formTeam.get('nombre').touched;
  }
  get emptySearch() {
    return this.formTeam.get('nombreToSearch').invalid && this.formTeam.get('nombreToSearch').touched;
  }
  get emptyOrden() {
    return this.formTeam.get('orden').invalid && this.formTeam.get('orden').touched;
  }
  get emptyLiga() {
    return this.formTeam.get('liga').invalid && this.formTeam.get('liga').touched;
  }
  get emptyRes() {
    return this.formTeam.get('resultadosUrl').invalid && this.formTeam.get('resultadosUrl').touched;
  }
  get emptyClas() {
    return this.formTeam.get('clasificacionUrl').invalid && this.formTeam.get('clasificacionUrl').touched;
  }
  get emptyCal() {
    return this.formTeam.get('calendarioUrl').invalid && this.formTeam.get('calendarioUrl').touched;
  }

}
