import { Component, OnInit } from '@angular/core';
import { EquipoModel } from 'src/app/models/equipo.model';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-chronicles',
  templateUrl: './admin-chronicles.component.html',
  styles: []
})
export class AdminChroniclesComponent implements OnInit {

  equipos: EquipoModel[] = [];
  loading = false;
  config = {
    property: 'jornada',
    direction: 1
  }

  constructor(private backend: BackendService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.backend.getEquipoCronicas().subscribe(equipos => {
      this.equipos = equipos;
    })
  }

  delete(idEquipo:string, idCronica: string, indexEquipo: number, indexCronica: number){
    Swal.fire({
      title: 'Estàs segur?',
      text: "La crònica s'eliminarà permanentment",
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
        this.backend.deleteCronica(idCronica, idEquipo).subscribe(() => {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          });
            this.equipos[indexEquipo].cronicas.splice(indexCronica,1);
        }, (err) => {
          console.log(err);
          Swal.fire({
            customClass: {
              confirmButton: 'btn btn-outline-orange'
            },
            buttonsStyling: false,
            icon: 'error'
          })
        });
      } 
    })
  }

  toEditChronicle(idTeam: string, idCronica: string){
    this.router.navigate(['admin/team/chronicle/edit', idTeam, idCronica]);
  }

}
