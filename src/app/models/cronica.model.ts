import { JugadorModel } from './jugador.model'

export class InnerPlayerChronicle {
    _id?: string
    jugador: JugadorModel
    minuto: number
    tipo?: string

    constructor(){}
}

export class CronicaModel {
    _id: string
    local: string
    visitante: string
    resultado: string
    jornada: number
    texto: string
    goleadores: InnerPlayerChronicle[]
    asistentes: InnerPlayerChronicle[]
    amarillas: InnerPlayerChronicle[]
    rojas: InnerPlayerChronicle[]
    fecha_creacion: Date

    constructor(){}
}