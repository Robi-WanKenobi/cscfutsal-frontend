import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CronicaModel, InnerPlayerChronicle } from 'src/app/models/cronica.model';
import { BackendService } from 'src/app/services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chronicle',
  templateUrl: './chronicle.component.html',
  styles: []
})
export class ChronicleComponent implements OnInit, OnChanges {

  @Input() cronicaId: string;
  amonestados: InnerPlayerChronicle[] = [];
  cronica: CronicaModel = new CronicaModel();

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  mergeAmonestados(cronica:CronicaModel) {
    return new Observable<InnerPlayerChronicle[]>((observer) => {
      for (let i = 0; i < this.cronica.amarillas.length; i++) {
        this.cronica.amarillas[i] = {
          ...this.cronica.amarillas[i],
          tipo: 'amarilla'
        }
      }
      for (let i = 0; i < this.cronica.rojas.length; i++) {
        this.cronica.rojas[i] = {
          ...this.cronica.rojas[i],
          tipo: 'roja'
        }
      }
      observer.next(this.cronica.amarillas.concat(this.cronica.rojas));
    })
  }

  ngOnChanges(): void {
    if (this.cronicaId) {
      this.backend.getCronica(this.cronicaId).subscribe(cronica =>{
        this.cronica = cronica;
        this.mergeAmonestados(cronica).subscribe(amonestados => {
          this.amonestados = amonestados;
        })
      })
    }
  }

}
