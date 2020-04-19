import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipoModel } from 'src/app/models/equipo.model';
import { CronicaModel } from 'src/app/models/cronica.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chronicle-form',
  templateUrl: './chronicle-form.component.html',
  styles: []
})
export class ChronicleFormComponent implements OnInit {

  equipoId: string;
  equipo: EquipoModel;
  cronica: CronicaModel = new CronicaModel();
  searchJornada: number;
  loading: boolean;
  searched = false;

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.equipoId = this.route.snapshot.paramMap.get('idt');
  }

  get validJornada() {
    return this.searchJornada && this.searchJornada > 0 && this.searchJornada <= 30;
  }

  ngOnInit(): void {
  }

  search() {
    if (this.validJornada) {
      this.loading = true
      this.backend.getPartidoJornada(this.equipoId, this.searchJornada).subscribe(partido => {
        this.cronica.local = partido.local;
        this.cronica.resultado = partido.resultado.replace(/\s+/g, '');;
        this.cronica.visitante = partido.visitante;
        this.cronica.jornada = this.searchJornada;
        this.searched = true;
        this.loading = false;
      })
    }
  }

  save() {
    Swal.showLoading();
    this.backend.saveCronica(this.cronica).subscribe(res =>{
      this.cronica._id = res._id;
      this.backend.addCronicaToEquipo(this.equipoId, this.cronica._id).subscribe( () =>{
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['admin/team/chronicle/edit', this.equipoId, this.cronica._id]);
      }, (err) => {
        Swal.fire({
          customClass: {
            confirmButton: 'btn btn-outline-orange'
          },
          buttonsStyling: false,
          icon: 'error'
        })
      })
    }, (error) => {
      Swal.fire({
        customClass: {
          confirmButton: 'btn btn-outline-orange'
        },
        buttonsStyling: false,
        icon: 'error'
      })
    })
  }
}
