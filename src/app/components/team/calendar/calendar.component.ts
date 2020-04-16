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
  calendario_1: CalendarioModel[] = [];
  calendario_2: CalendarioModel[] = [];
  months = [
    {id: '1', name: 'Gener'},
    {id: '2', name: 'Febrer'},
    {id: '3', name: 'Març'},
    {id: '4', name: 'Abril'},
    {id: '5', name: 'Maig'},
    {id: '6', name: 'Juny'},
    {id: '7', name: 'Juliol'},
    {id: '8', name: 'Agost'},
    {id: '9', name: 'Setembre'},
    {id: '10', name: 'Octubre'},
    {id: '11', name: 'Novembre'},
    {id: '12', name: 'Desembre'},
  ];
  selectedMonth: string;
  loading = true;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute
  ) { 
    this.equipoId = this.route.parent.snapshot.paramMap.get('id');
    this.selectedMonth = (new Date().getMonth() + 1).toString();
  }

  ngOnInit(): void {
    this.backend.getJugadores(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
    })
    this.backend.getCalendario(this.equipoId).subscribe(calendario => {
      for (let i = 0; i < calendario.length / 2; i++) {
        this.calendario_1.push(calendario[i]);
      }
      for (let i = calendario.length / 2; i < calendario.length; i++) {
        this.calendario_2.push(calendario[i]);
      }
      this.calendario = calendario;
      this.loading = false;
    })
  }
}
