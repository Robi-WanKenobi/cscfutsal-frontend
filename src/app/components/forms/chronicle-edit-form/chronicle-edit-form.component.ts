import { Component, OnInit } from '@angular/core';
import { EquipoModel } from 'src/app/models/equipo.model';
import { JugadorModel } from 'src/app/models/jugador.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CronicaModel, InnerPlayerChronicle } from 'src/app/models/cronica.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

class JugadorCronica {
  _id?:string
  jugador:JugadorModel
  minuto:number
}

@Component({
  selector: 'app-chronicle-edit-form',
  templateUrl: './chronicle-edit-form.component.html',
  styles: []
})
export class ChronicleEditFormComponent implements OnInit {

  equipoId: string;
  equipo: EquipoModel = new EquipoModel();
  jugadorId: string;
  jugador: JugadorModel = new JugadorModel();
  cronicaId: string;
  cronica: CronicaModel = new CronicaModel();
  formChronicle: FormGroup;
  public editor = ClassicEditor;

  texto: string;

  min: number;
  amonestados: any[] = [];


  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

      this.createForm();
      this.equipoId = this.route.snapshot.paramMap.get('idt');
      this.cronicaId = this.route.snapshot.paramMap.get('idc');
      this.loadData(this.cronicaId);

    }

  ngOnInit(): void {
    this.backend.getEquipo(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
    })
  }

  mergeAmonestados = new Observable<InnerPlayerChronicle[]>((observer) => {
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

  refreshCronica(){
    this.backend.getCronica(this.cronicaId).subscribe(cronica => {
      this.cronica = cronica;
      this.mergeAmonestados.subscribe(amonestados => {
          this.amonestados = amonestados;
        })
    })
  }

  createForm() {
    this.formChronicle = this.fb.group({
      local: ['', [Validators.required]],
      resultado: ['', [Validators.required]],
      visitante: ['', [Validators.required]]
    });
  }

  loadData(id: string) {
    this.backend.getCronica(id).subscribe(cronica => {
      this.cronica = cronica;
      this.formChronicle.reset(this.cronica);
      this.texto = this.cronica.texto;
      this.mergeAmonestados.subscribe(amonestados => {
          this.amonestados = amonestados;
        })
    })
  }
  
  save(){
    if (this.formChronicle.valid) {
      Swal.showLoading();
      let cronicaAux: CronicaModel = {
        ...this.formChronicle.value,
        fecha_creacion : this.cronica.fecha_creacion,
        texto: this.texto
      }
      this.backend.updateCronica(this.cronicaId, cronicaAux).subscribe(() => {
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigateByUrl('/admin/chronicles');
      }, (err) => {
        console.log(err);
          Swal.fire({
            customClass: {
              cancelButton: 'btn btn-outline-danger'
            },
            buttonsStyling: false,
            icon: 'error'
          })
      })
    }
  }

  addToGoleadores(jugador: JugadorModel) {
    let player: InnerPlayerChronicle = {
      jugador: jugador,
      minuto: this.min
    }
    if (this.validMin) {
      this.backend.addToGols(this.cronicaId, player).subscribe(() => {
        this.refreshCronica();
      })
    }
  }

  removeFromGoleadores(id:string, index:number){
    this.backend.delFromGols(this.cronicaId, id).subscribe(() =>{
      this.cronica.goleadores.splice(index, 1);
    })
  }

  addToAsistentes(jugador: JugadorModel) {
    let player: InnerPlayerChronicle = {
      jugador: jugador,
      minuto: this.min
    }
    if (this.validMin) {
      this.backend.addToAsis(this.cronicaId, player).subscribe(() => {
        this.refreshCronica();
      })
    }
  }

  removeFromAsistentes(id:string, index:number){
    this.backend.delFromAsis(this.cronicaId, id).subscribe(() =>{
      this.cronica.asistentes.splice(index, 1);
    })
  }

  addToAmarillas(jugador: JugadorModel) {
    let player: InnerPlayerChronicle = {
      jugador: jugador,
      minuto: this.min,
      tipo: 'amarilla'
    }
    if (this.validMin) {
      this.backend.addToAmarillas(this.cronicaId, player).subscribe(() => {
        this.refreshCronica();
      })
    }
  }

  removeFromAmarillas(id:string, index:number){
    this.backend.delFromAmarillas(this.cronicaId, id).subscribe(() =>{
      this.refreshCronica();
    })
  }

  addToRojas(jugador: JugadorModel) {
    let player: InnerPlayerChronicle = {
      jugador: jugador,
      minuto: this.min,
      tipo: 'roja'
    }
    if (this.validMin) {
      this.backend.addToRojas(this.cronicaId, player).subscribe(() => {
        this.refreshCronica();
      })
    }
  }

  removeFromRojas(id:string, index:number){
    this.backend.delFromRojas(this.cronicaId, id).subscribe(() =>{
      this.refreshCronica();
    })
  }

  get validMin() {
    return this.min <=40 && this.min >= 0 && this.min !== null;
  }
}
