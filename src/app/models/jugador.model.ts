export class JugadorModel {
    _id: string
    nombre: string
    apellido: string
    apodo: string
    tipo: string
    dorsal: number
    posicion: string
    equipo: string
    imagen: string
    estadisticas: {
        goles: number,
        asistencias: number
        amarillas: number,
        rojas: number,
        tarjetas: number
        partidos: number
        goles_encajados: number
        goles_pp: number
        goles_encajados_pp: number
        asistencias_pp: number
        hasErrors?:boolean
        loading?:boolean
    }

    constructor(){}
}