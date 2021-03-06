import { Component, OnInit } from '@angular/core';
import { EquipoModel } from 'src/app/models/equipo.model';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarioModel } from 'src/app/models/calendario.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: []
})
export class CalendarComponent implements OnInit {

  equipoId: string;
  equipo: EquipoModel;
  calendario: CalendarioModel[]=[];
  months: {}[] = [];
  selectedMonth: string;
  loading = true;
  errorFromFCF = false;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute
  ) {
    this.months = [
    {id: '10', name: 'Octubre'},
    {id: '11', name: 'Novembre'},
    {id: '12', name: 'Desembre'},
    {id: '1', name: 'Gener'},
    {id: '2', name: 'Febrer'},
    {id: '3', name: 'Març'},
    {id: '4', name: 'Abril'},
    {id: '5', name: 'Maig'}
    ];
    this.equipoId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.backend.getJugadores(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
    })
    this.backend.getCalendario(this.equipoId).subscribe(calendario => {
      this.calendario = calendario;
    }, (err) => {
      this.errorFromFCF = true;
    }).add(() => this.loading = false )
  }
}
