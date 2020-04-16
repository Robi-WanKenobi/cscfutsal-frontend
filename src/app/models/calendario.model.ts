export class CalendarioModel {
    numero: string;
    fecha: string;
    partidos: [
        {
            local: string
            visitante: string
            res_local: string
            res_visitante: string
            csc: boolean
        }
    ]
}