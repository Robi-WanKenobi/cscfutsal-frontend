import { Component, OnInit } from '@angular/core';
import { EquipoModel } from 'src/app/models/equipo.model';
import { JugadorModel } from 'src/app/models/jugador.model';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: []
})
export class StatsComponent implements OnInit {

  equipoId: string;
  equipo: EquipoModel;
  jugadores: JugadorModel[] = [];
  loading = true;
  searchText: string;

  config: {
    goles: boolean,
    asistencias: boolean,
    amonestaciones: boolean,
    porteros: boolean,
    property: string,
    subproperty: string,
    direction: number
  }

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute
  ) {
    this.config = {
      goles: true,
      asistencias: false,
      amonestaciones: false,
      porteros: false,
      property: 'estadisticas',
      subproperty: 'goles_pp',
      direction: -1
    }
    this.equipoId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.backend.getJugadores(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
      this.jugadores = equipo.jugadores;
      this.loading = false;
    })
  }

  goleadores() {
    this.config = {
      goles: true,
      asistencias: false,
      amonestaciones: false,
      porteros: false,
      property: 'estadisticas',
      subproperty: 'goles_pp',
      direction: -1
    }
  }

  asistentes() {
    this.config = {
      goles: false,
      asistencias: true,
      amonestaciones: false,
      porteros: false,
      property: 'estadisticas',
      subproperty: 'asistencias_pp',
      direction: -1
    }
  }

  amonestados() {
    this.config = {
      goles: false,
      asistencias: false,
      amonestaciones: true,
      porteros: false,
      property: 'estadisticas',
      subproperty: 'tarjetas',
      direction: -1
    }
  }

  porteros() {
    this.config = {
      goles: false,
      asistencias: false,
      amonestaciones: false,
      porteros: true,
      property: 'estadisticas',
      subproperty: 'goles_encajados_pp',
      direction: 1
    }
  }

}
