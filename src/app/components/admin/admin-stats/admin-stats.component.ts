import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { EquipoModel } from 'src/app/models/equipo.model';
import { JugadorModel } from 'src/app/models/jugador.model';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styles: []
})
export class AdminStatsComponent implements OnInit {

  equipos: EquipoModel[] = [];
  equiposAux: EquipoModel[] = [];
  loading = false;

  constructor(private backend: BackendService) {
    
  }

  ngOnInit(): void {
    this.backend.getEquipos().subscribe(equipos => {
      this.equipos = equipos;
      this.equipos.forEach(equipo => {
        equipo.jugadores.forEach(jugador => {
          jugador.estadisticas = {
            ...jugador.estadisticas,
            hasErrors: false
          }
        })
        this.equiposAux.push(equipo);
      })
      this.loading = false;
    })
  }

  saveJugador(jugador:JugadorModel) {
    jugador.estadisticas.loading = true;
    delete jugador.estadisticas.goles_pp;
    delete jugador.estadisticas.goles_encajados_pp;
    delete jugador.estadisticas.asistencias_pp;
    let stats = Object.values(jugador.estadisticas);
    for (let i = 0; i < stats.length; i++) {
      if (stats[i] < 0 || stats[i] === null){
        jugador.estadisticas.loading = false;
        jugador.estadisticas.hasErrors = true
        return;
      }
    }

    this.backend.updateJugador(jugador._id, jugador).subscribe(res => {
      jugador.estadisticas.hasErrors = false;
      jugador.estadisticas.loading = false;
    },(err) => {
      console.log(err)
      jugador.estadisticas.hasErrors = true;
      jugador.estadisticas.loading = false;
    })
   
  }

}
