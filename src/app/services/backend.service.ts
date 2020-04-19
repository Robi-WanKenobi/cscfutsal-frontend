import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EquipoModel } from '../models/equipo.model';
import { JugadorModel } from '../models/jugador.model';
import { CronicaModel, InnerPlayerChronicle } from '../models/cronica.model';
import { map } from 'rxjs/operators';
import { PartidoModel } from '../models/partido.model';
import { ClasificacionModel } from '../models/clasificacion.model';
import { CalendarioModel } from '../models/calendario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  token: string;
  baseURL: string;
  equipo : string;
  jugador : string;
  cronica : string;

  constructor(private http: HttpClient) {
    this.getToken();
    this.baseURL = environment.backURL;
    this.equipo = `${this.baseURL}/equipo/`;
    this.jugador = `${this.baseURL}/jugador/`;
    this.cronica = `${this.baseURL}/cronica/`;
  }

  getToken() {
    this.token = localStorage.getItem('token');
  }

  // EQUIPOS

  getEquipos(){
    return this.http.get(this.equipo).
      pipe(
        map((equipos:EquipoModel[]) => {
          return equipos;
        })
      )
  }

  getEquipo(id:string){
    return this.http.get(`${this.equipo}${id}`)
    .pipe(
      map((equipo:EquipoModel) => equipo)
    )
  }

  saveEquipo(equipo:EquipoModel) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(this.equipo, equipo, {headers});
  }

  deleteEquipo(id:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.delete(`${this.equipo}${id}`, {headers});
  }

  updateEquipo(id:string, equipo:EquipoModel) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.equipo}${id}`, equipo, {headers});
  }

  getEquipoCronicas(){
    return this.http.get(`${this.equipo}cronicas/all`)
    .pipe(
      map((equipos:EquipoModel[]) => equipos)
    )
  }

  getEquipoCronica(id:string, jornada:number){
    return this.http.get(`${this.equipo}${id}/cronicas/${jornada}`)
    .pipe(
      map((equipo:EquipoModel) => equipo)
    )
  }

  getJugadores(id:string){
    return this.http.get(`${this.equipo}jugadores/${id}`)
    .pipe(
      map((equipo:EquipoModel) => equipo)
    )
  }

  getTecnicos(id:string){
    return this.http.get(`${this.equipo}tecnicos/${id}`)
    .pipe(
      map((equipo:EquipoModel) => equipo)
    )
  }

  addJugadorToEquipo(idEquipo:string, idJugador:string){
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.equipo}${idEquipo}/add-jugador/${idJugador}`, null, {headers});
  }

  removeJugadorFromEquipo(idEquipo:string, idJugador:string){
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.equipo}${idEquipo}/remove-jugador/${idJugador}`, null, {headers});
  }

  addCronicaToEquipo(idEquipo:string, idCronica:string){
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.equipo}${idEquipo}/add-cronica/${idCronica}`, null, {headers});
  }

  removeCronicaFromEquipo(idEquipo:string, idCronica:string){
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.equipo}${idEquipo}/remove-cronica/${idCronica}`, null, {headers});
  }

  getJornadaActual(id:string) {
    return this.http.get(`${this.equipo}jornada/num/${id}`);
  }

  getClasificacion(id:string, jornada:number) {
    return this.http.get(`${this.equipo}clasificacion/${id}/${jornada}`)
    .pipe(
      map((clasificacion:ClasificacionModel[]) => clasificacion)
    )
  }

  getResultados(id:string, jornada:number) {
    return this.http.get(`${this.equipo}resultados/${id}/${jornada}`)
    .pipe(
      map((resultados:PartidoModel[]) => resultados)
    )
  }

  getCalendario(id:string) {
    return this.http.get(`${this.equipo}calendario/${id}`)
      .pipe(
        map((calendario:CalendarioModel[]) => calendario)
      )
  }

  getPartidoJornada(id:string, jornada:number) {
    return this.http.get(`${this.equipo}jornada/${id}/${jornada}`)
      .pipe(
        map((partido:PartidoModel) => {
          return partido
        })
      )
  }


  // JUGADORES

  getJugador(id:string) {
    return this.http.get(`${this.jugador}${id}`)
    .pipe(
      map((jugador:JugadorModel) => jugador)
    )
  }
  
  saveJugador(jugador:JugadorModel) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(this.jugador, jugador, {headers});
  }

  updateJugador(id:string, jugador:JugadorModel) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.jugador}${id}`, jugador, {headers})
    .pipe(
      map((jugador:JugadorModel) => jugador)
    )
  }

  uploadImage(id:string, image:any) {
    this.getToken();
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(`${this.jugador}image/${id}`, image, {headers});
  }

  deleteJugador(idJugador:string, idEquipo:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.delete(`${this.jugador}${idJugador}/${idEquipo}`, {headers});
  }
  
  getMaxGolsClub() {
    return this.http.get(`${this.jugador}stats/goles`)
    .pipe(
      map((jugadores:JugadorModel[]) => jugadores)
    )
  }

  getMinGolClub() {
    return this.http.get(`${this.jugador}stats/porteros`)
    .pipe(
      map((jugadores:JugadorModel[]) => jugadores)
    )
  }

  getMaxAsisClub() {
    return this.http.get(`${this.jugador}stats/asistencias`)
    .pipe(
      map((jugadores:JugadorModel[]) => jugadores)
    )
  }

  getMaxAmonClub() {
    return this.http.get(`${this.jugador}stats/tarjetas`)
    .pipe(
      map((jugadores:JugadorModel[]) => jugadores)
    )
  }


  // CRONICAS

  saveCronica(cronica: CronicaModel) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(this.cronica, cronica, {headers})
    .pipe(
      map((cronica:CronicaModel) => cronica)
    )
  }

  getCronica(id:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.get(`${this.cronica}${id}`, {headers})
    .pipe(
      map((cronica:CronicaModel) => cronica)
    )
  }

  deleteCronica(idCronica:string, idEquipo:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.delete(`${this.cronica}${idCronica}/${idEquipo}`, {headers});
  }

  updateCronica(id:string, cronica: CronicaModel) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.cronica}${id}`, cronica, {headers});
  }


  addToGols(id:string, jugador:InnerPlayerChronicle) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.cronica}${id}/goleadores`, jugador, {headers});
  }

  addToAsis(id:string, jugador:InnerPlayerChronicle) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.cronica}${id}/asistentes`, jugador, {headers});
  }

  addToAmarillas(id:string, jugador:InnerPlayerChronicle) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.cronica}${id}/amarillas`, jugador, {headers});
  }

  addToRojas(id:string, jugador:InnerPlayerChronicle) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(`${this.cronica}${id}/rojas`, jugador, {headers});
  }

  delFromGols(id:string, idJugador:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.cronica}${id}/goleadores/${idJugador}`, null, {headers});
  }

  delFromAsis(id:string, idJugador:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.cronica}${id}/asistentes/${idJugador}`, null, {headers});
  }

  delFromAmarillas(id:string, idJugador:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.cronica}${id}/amarillas/${idJugador}`, null, {headers});
  }

  delFromRojas(id:string, idJugador:string) {
    this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.put(`${this.cronica}${id}/rojas/${idJugador}`, null, {headers});
  }
}
