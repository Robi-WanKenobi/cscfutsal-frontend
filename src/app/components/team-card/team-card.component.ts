import { Component, OnInit, Input } from '@angular/core';
import { EquipoModel } from 'src/app/models/equipo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styles: []
})
export class TeamCardComponent implements OnInit {

  @Input() equipo: EquipoModel;
  @Input() index: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toTeam(id:string){
    this.router.navigateByUrl(`/teams/team/${id}`);
  }

}
