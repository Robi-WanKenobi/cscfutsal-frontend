import { Component, OnInit, Input } from '@angular/core';
import { JugadorModel } from 'src/app/models/jugador.model';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styles: []
})
export class PlayerCardComponent implements OnInit {

  @Input() jugador:JugadorModel;

  constructor() { }

  ngOnInit(): void {
  }

}
