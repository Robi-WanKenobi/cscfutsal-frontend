export class ClasificacionModel {
    posicion: number
    nombre: string
    puntos: number
    jugados: number
    csc: boolean
    partidos: {
        ganados: number
        empatados: number
        perdidos: number
    }
    goles: {
        favor: number
        contra: number
    }
}