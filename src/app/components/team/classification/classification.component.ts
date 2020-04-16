import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { EquipoModel } from 'src/app/models/equipo.model';
import { ClasificacionModel } from 'src/app/models/clasificacion.model';
import { PartidoModel } from 'src/app/models/partido.model';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styles: []
})
export class ClassificationComponent implements OnInit {

  equipoId:string;
  equipo:EquipoModel;
  jornada:number;
  current:number;
  classification: ClasificacionModel[] = [];
  results: PartidoModel[] = []
  loading = true;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute
  ) {

    this.equipoId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.backend.getEquipo(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
    })
    this.backend.getJornadaActual(this.equipoId).subscribe(jornada => {
      this.jornada = Number(jornada);
      this.current = this.jornada;
      this.getClassification(this.jornada);
      this.getResultados(this.equipoId, this.jornada);
    })
  }
  
  getClassification(jornada:number){
    if(jornada){
      this.backend.getClasificacion(this.equipoId, this.jornada).subscribe(classification => {
        this.classification = classification;
        this.loading = false;
      })
    }
  }

  getResultados(equipoId:string, jornada:number){
    if(jornada){
      this.backend.getResultados(equipoId, jornada).subscribe(resultados =>{
        this.results = resultados;
        this.loading = false;
      })
    }
  }

  up() {
    this.loading = true;
    if(this.jornada <= 30) {
      this.jornada++;
      this.getResultados(this.equipoId, this.jornada);
      this.getClassification(this.jornada);
    }
  }

  down() {
    this.loading = true;
    if(this.jornada >= 1) {
      this.jornada--;
      this.getResultados(this.equipoId, this.jornada);
      this.getClassification(this.jornada);
    }
  }

  toCurrent() {
    this.loading = true;
    this.jornada = this.current;
    this.getResultados(this.equipoId, this.jornada);
    this.getClassification(this.jornada);
  }
}
