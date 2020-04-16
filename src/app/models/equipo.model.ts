import { JugadorModel } from "./jugador.model";
import { CronicaModel } from './cronica.model';

export class EquipoModel {
    _id: string
    nombre: string
    nombreToSearch: string
    orden: number
    liga: string
    resultadosUrl: string
    clasificacionUrl: string
    calendarioUrl: string
    jugadores: JugadorModel[]
    cronicas: CronicaModel[]

    constructor(){}
}