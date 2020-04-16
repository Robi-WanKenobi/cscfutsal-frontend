import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { EquipoModel } from 'src/app/models/equipo.model';
import { PartidoModel } from 'src/app/models/partido.model';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html'
})
export class MatchesComponent implements OnInit, OnChanges {

  @Input() type: string;
  @Input() jornada: number;
  @Input() equipos: EquipoModel[];
  partidos: PartidoModel[] = [];
  partidosRequest: Observable<PartidoModel>[] = [];
  loading = true;

  constructor(private backend: BackendService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.jornada && this.equipos) {
      this.equipos.forEach(equipo => {
        this.partidosRequest.push(this.backend.getPartidoJornada(equipo._id,this.jornada));
      })
      forkJoin(this.partidosRequest).subscribe(partidos =>{
        this.partidos = partidos
      }).add(()=> this.loading = false)
    }
  }

}
