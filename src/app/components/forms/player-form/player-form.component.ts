import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JugadorModel } from 'src/app/models/jugador.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { EquipoModel } from 'src/app/models/equipo.model';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styles: []
})
export class PlayerFormComponent implements OnInit {

  equipoId: string;
  equipo: EquipoModel;
  jugadorId: string;
  jugador: JugadorModel = new JugadorModel();
  formPlayer: FormGroup;
  imagen: FormData;
  isNew: boolean;

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.createForm();
    this.equipoId = this.route.snapshot.paramMap.get('idt');
    this.jugadorId = this.route.snapshot.paramMap.get('idp');
  }

  ngOnInit(): void {
    if (this.jugadorId === 'new') {
      this.isNew = true;
    }
    else {
      this.isNew = false;
      this.loadData();
    }
    this.getEquipo();
  }

  createForm() {
    this.formPlayer = this.fb.group({
      equipo: [''],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      apodo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      dorsal: ['', [Validators.required]],
      posicion: ['', [Validators.required]],
    });
  }

  getEquipo() {
    this.backend.getEquipo(this.equipoId).subscribe(equipo => {
      this.equipo = equipo;
    })
  }

  loadData() {
    this.backend.getJugador(this.jugadorId).subscribe(jugador => {
      this.jugador = jugador;
      this.formPlayer.reset(this.jugador);
    })
  }

  save() {
    
    Swal.showLoading();
    this.formPlayer.controls['equipo'].setValue(this.equipo.nombre);
    if (this.formPlayer.valid) {
      let jugador = {
        ...this.formPlayer.value,
        estadisticas: this.jugador.estadisticas
      }
      let backendRequest: Observable<any>;
      if (this.isNew){
        backendRequest = this.backend.saveJugador(jugador);
      }
      else {
        backendRequest = this.backend.updateJugador(this.jugadorId, jugador);
      }

      backendRequest.subscribe((player:JugadorModel) => {
        this.jugador = player;
        this.jugadorId = player._id;
        if (this.isNew) {
          this.backend.addJugadorToEquipo(this.equipoId, this.jugadorId).subscribe(() => {
            Swal.fire({
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['admin/team/player', this.equipoId, this.jugadorId]);
            this.loadData();
            this.isNew = false;
          }, (error) => {
            console.log(error);
            Swal.fire({
              customClass: {
                confirmButton: 'btn btn-outline-orange'
              },
              buttonsStyling: false,
              icon: 'error'
            })
          })
        } else {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/admin/teams');
        }
      }, (err) => {
        console.log(err);
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

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);
      this.imagen = formData;
    }
  }

  uploadImage(id) {
    this.backend.uploadImage(id, this.imagen).subscribe(() => {
      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => {this.loadData(); }, 500);
    }, (err) => {
      console.log(err);
      Swal.fire({
        customClass: {
          confirmButton: 'btn btn-outline-orange'
        },
        buttonsStyling: false,
        icon: 'error'
      })
    });   
  }

  get emptyEquipo() {
    return this.formPlayer.get('equipo').invalid && this.formPlayer.get('equipo').touched;
  }
  get emptyNombre() {
    return this.formPlayer.get('nombre').invalid && this.formPlayer.get('nombre').touched;
  }
  get emptyApellido() {
    return this.formPlayer.get('apellido').invalid && this.formPlayer.get('apellido').touched;
  }
  get emptyApodo() {
    return this.formPlayer.get('apodo').invalid && this.formPlayer.get('apodo').touched;
  }
  get emptyTipo() {
    return this.formPlayer.get('tipo').invalid && this.formPlayer.get('tipo').touched;
  }
  get emptyDorsal() {
    return this.formPlayer.get('dorsal').invalid && this.formPlayer.get('dorsal').touched;
  }
  get emptyPosicion() {
    return this.formPlayer.get('posicion').invalid && this.formPlayer.get('posicion').touched;
  }

}
