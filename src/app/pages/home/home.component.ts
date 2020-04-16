import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { EquipoModel } from 'src/app/models/equipo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  equipos: EquipoModel[] = [];
  current: number;
  next: number;

  constructor(private backend: BackendService) { 
    this.backend.getEquipos().subscribe(equipos => {
      this.equipos = equipos;
      this.backend.getJornadaActual(this.equipos[0]._id).subscribe(jornada => {
        this.current = Number(jornada) - 1;
        this.next = Number(jornada);
      })
    })
  }

  ngOnInit(): void {
  }

}
