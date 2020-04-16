import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { EquipoModel } from 'src/app/models/equipo.model';
import { JugadorModel } from 'src/app/models/jugador.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: []
})
export class PlayersComponent implements OnInit {

  equipoId:string;
  equipo:EquipoModel;
  jugadores:JugadorModel[] = [];
  tecnicos:JugadorModel[]=[];
  loading = true;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute
  ) {

    this.equipoId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.backend.getJugadores(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
      this.jugadores = equipo.jugadores;
      this.loading = false;
    })
    this.backend.getTecnicos(this.equipoId).subscribe(equipo =>{
      this.tecnicos = equipo.jugadores;
      this.loading = false;
    })
  }

}
