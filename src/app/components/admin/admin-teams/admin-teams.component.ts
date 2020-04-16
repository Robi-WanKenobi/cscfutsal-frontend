import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { EquipoModel } from 'src/app/models/equipo.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styles: []
})
export class AdminTeamsComponent implements OnInit {

  equipos: EquipoModel[] = [];

  constructor(private backend: BackendService,
              private router: Router) { }

  ngOnInit(): void {
    this.backend.getEquipos().subscribe(equipos => {
      this.equipos = equipos;
    })
  }

  delete(idEquipo:string, idJugador: string, indexEquipo: number, indexJugador: number){
    Swal.fire({
      title: 'Estàs segur?',
      text: "El jugador s'eliminarà permanentment",
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
        this.backend.deleteJugador(idJugador, idEquipo).subscribe(() => {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          });
            this.equipos[indexEquipo].jugadores.splice(indexJugador,1);
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

  toEditPlayer(idTeam: string, idPlayer: string){
    this.router.navigate(['admin/team/player', idTeam, idPlayer]);
  }

}
