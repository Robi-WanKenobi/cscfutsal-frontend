import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { EquipoModel } from 'src/app/models/equipo.model';
import { ClasificacionModel } from 'src/app/models/clasificacion.model';
import { PartidoModel } from 'src/app/models/partido.model';
import { CronicaModel } from 'src/app/models/cronica.model';

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
  results: PartidoModel[] = [];
  cronicaId: string;
  loading = true;
  errorFromFCF = false;

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
      this.getResultados(this.equipoId, this.jornada);
      this.getCronica(this.equipoId, this.jornada);
      this.getClassification(this.equipoId, this.jornada);
    })
  }

  getCronica(equipoId:string, jornada:number) {
    if(jornada) {
      this.backend.getEquipoCronica(equipoId, jornada).subscribe(team => {
        this.cronicaId = team.cronicas[0]? team.cronicas[0]._id : null;
      })
    }
  }
  
  getClassification(equipoId:string, jornada:number){
    if(jornada){
      this.backend.getClasificacion(equipoId, jornada).subscribe(classification => {
        this.classification = classification;
      }, (error) => {
        this.errorFromFCF = true;
      }).add(() => this.loading = false)
    }
  }

  getResultados(equipoId:string, jornada:number){
    if(jornada){
      this.backend.getResultados(equipoId, jornada).subscribe(resultados =>{
        this.results = resultados;
      }, (error) => {
        this.errorFromFCF = true;
      }).add(() => this.loading = false)
    }
  }

  up() {
    this.loading = true;
    if(this.jornada <= 30) {
      this.jornada++;
      this.getResultados(this.equipoId, this.jornada);
      this.getCronica(this.equipoId, this.jornada);
      this.getClassification(this.equipoId, this.jornada);
    }
  }

  down() {
    this.loading = true;
    if(this.jornada >= 1) {
      this.jornada--;
      this.getResultados(this.equipoId, this.jornada);
      this.getCronica(this.equipoId, this.jornada);
      this.getClassification(this.equipoId, this.jornada);
    }
  }

  toCurrent() {
    this.loading = true;
    this.jornada = this.current;
    this.getResultados(this.equipoId, this.jornada);
    this.getCronica(this.equipoId, this.jornada);
    this.getClassification(this.equipoId, this.jornada);
  }
}
