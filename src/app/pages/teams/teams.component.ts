import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { EquipoModel } from 'src/app/models/equipo.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: []
})
export class TeamsComponent implements OnInit {

  equipos: EquipoModel[] = [];

  constructor(private backend: BackendService) { 
    this.backend.getEquipos().subscribe(equipos => {
      this.equipos = equipos;
    });
  }

  ngOnInit(): void {
  }

}
