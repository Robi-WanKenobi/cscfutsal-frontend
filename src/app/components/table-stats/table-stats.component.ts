import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { JugadorModel } from 'src/app/models/jugador.model';

@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styles: []
})
export class TableStatsComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() type: string;
  jugadores: JugadorModel[] = [];

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if (this.type){
      switch(this.type) {
        case 'gol': {
          this.backend.getMaxGolsClub().subscribe(jugadores => {
            this.jugadores = jugadores;
          })
          break;
        }
        case 'ass': {
          this.backend.getMaxAsisClub().subscribe(jugadores => {
            this.jugadores = jugadores;
          })
          break;
        }
        case 'amo': {
          this.backend.getMaxAmonClub().subscribe(jugadores => {
            this.jugadores = jugadores;
          })
          break;
        }
        case 'por': {
          this.backend.getMinGolClub().subscribe(jugadores => {
            this.jugadores = jugadores;
          })
          break;
        }
        default: {
          break;
        }
    }
  }
      
  }

}
